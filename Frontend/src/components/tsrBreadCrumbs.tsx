import { useTSRBreadCrumbs } from "@/lib/use-tsr-breadcrumbs";
import { Link } from "@tanstack/react-router";

export function TSRBreadCrumbs() {
  const { breadcrumb_routes } = useTSRBreadCrumbs();

  if (breadcrumb_routes.length < 1) return null;
  const crumbs = [{ name: "Home", path: "/" }, ...breadcrumb_routes];
  return (
    <div className="w-full container mx-auto h-[50px] flex flex-row items-center gap-1">
      <p className="text-xs">Du er her:</p>
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        return (
          <span key={crumb.path} className="flex flex-row items-center gap-1">
            {isLast ? (
              <span className="text-xs">{crumb.name}</span>
            ) : (
              <>
                <Link className="text-xs" to={crumb.path}>
                  {crumb.name}
                </Link>
                <span>/</span>
              </>
            )}
          </span>
        );
      })}
    </div>
  );
}
