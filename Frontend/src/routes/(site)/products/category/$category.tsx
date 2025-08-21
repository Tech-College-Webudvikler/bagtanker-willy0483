import { Spinner } from "@/components/spinner";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createCategoryProductsQueryOptions } from "@/queryOptions/createCategoryProductsQueryOptions";
import Card from "@/components/card";

export const Route = createFileRoute("/(site)/products/category/$category")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      category: params.category,
    };
  },
  pendingComponent: () => <Spinner />,
});

function RouteComponent() {
  const { category } = Route.useLoaderData();
  const {
    data: categoryData,
    isError,
    error,
    refetch,
  } = useSuspenseQuery(createCategoryProductsQueryOptions(category));

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-dark-grey p-8 rounded-lg shadow-lg">
          <p className="text-red-400 mb-4">Something went wrong.</p>
          <p className="text-red-400">Error: {error.message}</p>
          <button
            className="bg-green-gold hover:cursor-pointer text-white px-4 py-2 rounded transition"
            onClick={() => refetch()}
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className=" container my-4 mx-auto">
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {categoryData.categoryProducts.map((item) => (
          <Card key={item.products.id} {...item.products} />
        ))}
      </section>
    </div>
  );
}
