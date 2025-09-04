import type { Character } from "@/types/character";
import { Link } from "@tanstack/react-router";
import type { Table } from "@tanstack/react-table";
import { Button } from "./Button";

interface Props {
  table: Table<Character>;
}

export const Pagination = ({ table }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <div data-testid="page-info">
        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </div>
      <Link
        from="/characters"
        search={(prev) => ({ ...prev, page: 1 })}
        disabled={!table.getCanPreviousPage()}
      >
        <Button data-testid="first-page" disabled={!table.getCanPreviousPage()}>
          {"<<"}
        </Button>
      </Link>
      <Link
        from="/characters"
        search={(prev) => ({ ...prev, page: prev.page - 1 })}
        disabled={!table.getCanPreviousPage()}
      >
        <Button
          data-testid="previous-page"
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </Button>
      </Link>
      <Link
        from="/characters"
        search={(prev) => ({ ...prev, page: prev.page + 1 })}
        disabled={!table.getCanNextPage()}
      >
        <Button data-testid="next-page" disabled={!table.getCanNextPage()}>
          {">"}
        </Button>
      </Link>
      <Link
        from="/characters"
        search={(prev) => ({ ...prev, page: table.getPageCount() })}
        disabled={!table.getCanNextPage()}
      >
        <Button data-testid="last-page" disabled={!table.getCanNextPage()}>
          {">>"}
        </Button>
      </Link>
    </div>
  );
};
