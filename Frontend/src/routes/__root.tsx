import CategoryNav from "@/components/categoryNav";
import Header from "@/components/header";
import { TSRBreadCrumbs } from "@/components/tsrBreadCrumbs";
import { AuthProvider } from "@/providers/authProvider";
import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";

function RootComponent() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <main>
      <AuthProvider>
        <Header />
        {pathname !== "/" && <CategoryNav />}
        {pathname !== "/" && <TSRBreadCrumbs />}
        <Outlet />
        <Toaster />
      </AuthProvider>
      {/* Add dev tools for router */}
      <TanStackRouterDevtools />
    </main>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
