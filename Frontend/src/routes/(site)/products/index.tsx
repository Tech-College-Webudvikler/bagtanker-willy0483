import Card from "@/components/card";
import { Spinner } from "@/components/spinner";
import type { T_Product } from "@/lib/types";
import { createProductsQueryOptions } from "@/queryOptions/createProductsQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(site)/products/")({
  component: RouteComponent,
  pendingComponent: () => <Spinner />,
});

function RouteComponent() {
  const { data, isPending, isError, refetch, error } = useQuery(
    createProductsQueryOptions()
  );

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-dark-grey">
        <div className="bg-blue-grey p-8 rounded-lg shadow-lg">
          <p className="text-red-400 mb-4">Something went wrong.</p>
          <p className="text-red-400">Error: {error.message}</p>
          <button
            className="bg-green-gold hover:bg-green-gold text-white px-4 py-2 rounded transition"
            onClick={() => refetch()}
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className=" container my-4 mx-auto">
      {isPending ? (
        <Spinner />
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {data?.map((product: T_Product) => (
            <Card key={product.id} {...product} />
          ))}
        </section>
      )}
    </div>
  );
}
