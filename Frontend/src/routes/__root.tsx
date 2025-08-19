import Header from "@/components/header";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <main>
      <Header />
      <Outlet />
      {/* Add dev tools for router */}
      <TanStackRouterDevtools />
    </main>
  ),
});
