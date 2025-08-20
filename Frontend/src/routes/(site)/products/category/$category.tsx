import { Spinner } from "@/components/spinner";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(site)/products/category/$category")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      category: params.category,
    };
  },
  pendingComponent: () => <Spinner />,
  errorComponent: () => <div>Error...</div>,
});

function RouteComponent() {
  const { category } = Route.useLoaderData();

  return <div>Hello "/(site)/products/$category"! {category}</div>;
}
