import type { Character } from "@/types/character";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Character>();

export const columns = [
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("status", { header: "Status" }),
  columnHelper.accessor("species", { header: "Species" }),
  columnHelper.accessor("type", { header: "Type" }),
  columnHelper.accessor("gender", { header: "Gender" }),
];
