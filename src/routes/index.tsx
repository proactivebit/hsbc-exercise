import { DEFAULT_PAGE_SIZE } from "@/constants/pagination";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () =>
    redirect({
      to: "/app/characters",
      search: { page: 1, size: DEFAULT_PAGE_SIZE },
    }),
});
