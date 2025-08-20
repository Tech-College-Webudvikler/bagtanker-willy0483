import { Spinner } from "@/components/spinner";
import { createMessagesDetailsQueryOptions } from "@/queryOptions/createMessagesQueryOptions";
import { createProductDetailsQueryOptions } from "@/queryOptions/createProductsQueryOptions";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/(site)/products/$product")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      slug: params.product,
    };
  },
  pendingComponent: () => <Spinner />,
  errorComponent: () => <div>Error...</div>,
});

function RouteComponent() {
  const { slug } = Route.useLoaderData();

  const { data: item } = useSuspenseQuery(
    createProductDetailsQueryOptions(slug)
  );

  const { data: messages } = useQuery(
    createMessagesDetailsQueryOptions(item?.id)
  );

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  // todo fix messages is not array

  return (
    <>
      <h3 className=" container mx-auto font-bold text-3xl py-8">
        {item?.title}
      </h3>
      <div className="container mx-auto grid grid-cols-10 gap-6">
        <section className="col-span-7">
          <figure className="grid grid-cols-2 gap-8">
            <img
              src={item?.imageUrl}
              alt={item?.slug}
              className="w-full h-full aspect-square"
            />
            <figcaption>{item?.description}</figcaption>
          </figure>
          <article className="py-4">{item?.procedure}</article>

          <p className="text-4xl font-extrabold">Pris: {item?.price},00 DK</p>
        </section>
        <section className="col-span-3">
          <div className="bg-blue-grey p-2 rounded-tl-2xl rounded-tr-2xl text-white text-2xl">
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
              <li key={index} className={`border p-2 border-b-[#B1B1B1]`}>
                {item.amount} {item.units.abbreviation} {item.ingredients.title}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className=" container mx-auto">
        <h3>Kommentarer</h3>
        <ul>
          {messages?.map((message) => <li key={message.id}>{message.name}</li>)}
        </ul>
      </section>
    </>
  );
}
