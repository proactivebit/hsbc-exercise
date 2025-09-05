import { PAGE_SIZE } from "@/constants/pagination";
import type { Character } from "@/types/character";
import type { PageResponse } from "@/types/page";
import { useNavigate } from "@tanstack/react-router";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Pagination } from "../Pagination";
import { columns } from "./utils";

interface Props {
  data: PageResponse<Character> | undefined;
  pageNumber: number;
  isLoading: boolean;
  isError: boolean;
}

export const CharactersTable = ({
  data,
  pageNumber,
  isLoading,
  isError,
}: Props) => {
  const navigate = useNavigate({ from: "/app/characters" });

  const table = useReactTable({
    data: data?.results ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: data?.info.pages ?? 0,
    state: {
      pagination: {
        pageIndex: pageNumber - 1,
        pageSize: PAGE_SIZE,
      },
    },
  });

  const handleRowClick = (characterId: number) => {
    navigate({
      to: "/app/character/$characterId",
      params: { characterId: String(characterId) },
    });
  };

  if (isLoading) {
    return <div data-testid="characters-loading">Loading...</div>;
  }

  if (isError) {
    return (
      <div data-testid="characters-error" className="text-red-600">
        Error loading characters. Change filters criteria and try again.
      </div>
    );
  }

  if (!data?.info.count) {
    return <div data-testid="characters-no-data">No data available.</div>;
  }

  return (
    <div data-testid="characters-table" className="flex flex-col gap-4">
      <table style={{ width: table.getTotalSize() }}>
        <thead>
          <tr className="bg-gray-200">
            {table.getFlatHeaders().map((header) => (
              <th
                className="px-4 py-2 text-left whitespace-nowrap"
                key={header.id}
                colSpan={header.colSpan}
                style={{ width: header.getSize() }}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              className="border-b border-gray-200 cursor-pointer"
              key={row.id}
              onClick={() => handleRowClick(row.original.id)}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  className="px-4 py-1 whitespace-nowrap overflow-hidden text-ellipsis text-sm"
                  key={cell.id}
                  style={{
                    width: cell.column.getSize(),
                    maxWidth: cell.column.getSize(),
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination table={table} />
    </div>
  );
};
