import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="container mx-auto min-h-[calc(100vh-200px)] flex items-center justify-center">
      <Outlet />
    </section>
  );
}
