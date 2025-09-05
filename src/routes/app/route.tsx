import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <div className="min-h-dvh flex justify-center items-center p-4">
      <Outlet />
    </div>
  );
}
