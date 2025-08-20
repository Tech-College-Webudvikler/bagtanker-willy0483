import Header from "@/components/header";
import { AuthProvider } from "@/providers/authProvider";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <main>
      <AuthProvider>
        <Header />
        <Outlet />
      </AuthProvider>

      {/* Add dev tools for router */}
      <TanStackRouterDevtools />
    </main>
  ),
});
