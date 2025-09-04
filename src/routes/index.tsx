import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () =>
    redirect({ to: "/characters", search: { page: 1 }, replace: true }),
});
