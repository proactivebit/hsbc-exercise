import type { Character } from "@/types/character";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Character>();

export const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    size: 300,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    size: 100,
  }),
  columnHelper.accessor("species", {
    header: "Species",
    size: 120,
  }),
  columnHelper.accessor("type", {
    header: "Type",
    size: 150,
  }),
  columnHelper.accessor("gender", {
    header: "Gender",
    size: 100,
  }),
];
