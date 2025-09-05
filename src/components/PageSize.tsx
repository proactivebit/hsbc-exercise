import type { Character } from "@/types/character";
import { useNavigate } from "@tanstack/react-router";
import type { Table } from "@tanstack/react-table";

interface Props {
  table: Table<Character>;
}

export const PageSize = ({ table }: Props) => {
  const navigate = useNavigate({ from: "/app/characters" });

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate({
      search: (prev) => ({ ...prev, page: 1, size: Number(e.target.value) }),
    });
  };

  return (
    <select
      className="border rounded px-2 py-1 appearance-none"
      value={table.getState().pagination.pageSize}
      onChange={onChange}
    >
      {[10, 20, 30, 40, 50].map((pageSize) => (
        <option key={pageSize} value={pageSize}>
          {pageSize}
        </option>
      ))}
    </select>
  );
};
