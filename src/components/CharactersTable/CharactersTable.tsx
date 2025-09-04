import { PAGE_SIZE } from "@/constants/pagination";
import type { Character } from "@/types/character";
import type { PageResponse } from "@/types/page";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Pagination } from "../Pagination";
import { columns } from "./utils";

interface Props {
  data: PageResponse<Character>;
  pageNumber: number;
}

export const CharactersTable = ({ data, pageNumber }: Props) => {
  const table = useReactTable({
    data: data.results,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: data.info.pages,
    state: {
      pagination: {
        pageIndex: pageNumber - 1,
        pageSize: PAGE_SIZE,
      },
    },
  });

  return (
    <div data-testid="characters-table">
      <table>
        <thead>
          <tr>
            {table.getFlatHeaders().map((header) => (
              <th key={header.id} colSpan={header.colSpan}>
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
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
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
