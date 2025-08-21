import { Spinner } from "@/components/spinner";
import { createReviewsDetailsQueryOptions } from "@/queryOptions/createReviewsQueryOptions";
import { createProductDetailsQueryOptions } from "@/queryOptions/createProductsQueryOptions";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import Comments from "@/components/comments";
import { useAuth } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useActionState } from "react";
import { createReview } from "@/lib/auth";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/(site)/products/$product")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      slug: params.product,
    };
  },
  pendingComponent: () => <Spinner />,
});

function RouteComponent() {
  const { loginData } = useAuth();

  const [state, action] = useActionState(createReview, undefined);
  const queryClient = useQueryClient();

  const { slug } = Route.useLoaderData();

  const {
    data: item,
    isError,
    error,
    refetch,
  } = useSuspenseQuery(createProductDetailsQueryOptions(slug));

  const { data: reviews } = useQuery(
    createReviewsDetailsQueryOptions(item?.id)
  );

  useEffect(() => {
    if (state?.success) {
      queryClient.invalidateQueries({
        queryKey: createReviewsDetailsQueryOptions(item?.id).queryKey,
      });
    }
  }, [state, item?.id, queryClient]);

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
    <>
      <h3 className="container mx-auto font-bold text-2xl sm:text-3xl py-6 sm:py-8">
        {item?.title}
      </h3>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-10 gap-6">
        <section className="lg:col-span-7 col-span-1">
          <figure className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <img
              src={item?.imageUrl}
              alt={item?.slug}
              className="w-full h-auto aspect-square object-cover rounded-lg"
            />
            <figcaption className="mt-2 md:mt-0">
              {item?.description}
            </figcaption>
          </figure>
          <article className="py-4">{item?.procedure}</article>
          <p className="text-2xl sm:text-3xl font-extrabold mt-4">
            Pris: {item?.price},00 DK
          </p>
        </section>
        <section className="lg:col-span-3 col-span-1 mt-6 lg:mt-0">
          <div className="bg-blue-grey p-2 rounded-tl-2xl rounded-tr-2xl text-white text-xl sm:text-2xl">
            <p>Opskrift</p>
          </div>
          <ul className="bg-[#F5F5F0] h-full text-blue-grey">
            <li className="border p-2 bg-[#D7D7D2] border-b-[#B1B1B1]">
              Varighed {item?.durationInMinutes} min
            </li>
            <li className="border p-2 bg-[#D7D7D2] border-b-[#B1B1B1]">
              Antal {item?.amount} stk
            </li>
            {item?.productIngredients.map((item, index) => (
              <li key={index} className="border p-2 border-b-[#B1B1B1]">
                {item.amount} {item.units.abbreviation} {item.ingredients.title}
              </li>
            ))}
          </ul>
        </section>
      </div>
      <section className=" container mx-auto">
        <p className="text-4xl font-extrabold mt-18 mb-2">Kommentarer</p>
        {loginData ? (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <button className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  Skriv en anmeldelse
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Skriv en anmeldelse</DialogTitle>
                  <DialogDescription>
                    Del din oplevelse med produktet. Din anmeldelse hjælper
                    andre brugere!
                  </DialogDescription>
                </DialogHeader>
                <form action={action} className="flex flex-col gap-4 mt-4">
                  <input
                    type="text"
                    name="title"
                    placeholder="Titel på anmeldelse"
                    className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                  {state?.error?.title && (
                    <p className="text-sm text-red-500">{state.error.title}</p>
                  )}
                  <select
                    name="numStars"
                    className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                    defaultValue=""
                  >
                    {state?.error?.numStars && (
                      <p className="text-sm text-red-500">
                        {state.error.numStars}
                      </p>
                    )}
                    <option value="" disabled>
                      Vælg antal stjerner
                    </option>
                    <option value="1">1 stjerne</option>
                    <option value="2">2 stjerner</option>
                    <option value="3">3 stjerner</option>
                    <option value="4">4 stjerner</option>
                    <option value="5">5 stjerner</option>
                  </select>
                  <textarea
                    name="comment"
                    className="border rounded-lg p-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Skriv din anmeldelse her..."
                    required
                  />
                  <input type="hidden" name="productId" value={item?.id} />
                  {state?.error?.comment && (
                    <p className="text-sm text-red-500">
                      {state.error.comment}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="self-end px-6 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Send anmeldelse
                  </button>
                </form>
              </DialogContent>
            </Dialog>

            <ul>
              {reviews?.map((item, index) => (
                <li key={index}>
                  <Comments
                    title={item.title}
                    comment={item.comment}
                    numStars={item.numStars}
                    user={item.user}
                    createdAt={item.createdAt}
                  />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="flex justify-center items-center py-8">
            <Link
              to="/login"
              className="px-6 hover:cursor-pointer py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login for at kommentere
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
