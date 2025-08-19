import { createFileRoute } from "@tanstack/react-router";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "../App.css";
import { useQuery } from "@tanstack/react-query";
import { createNewsQueryOptions } from "@/queryOptions/createNewsQueryOptions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Spinner } from "@/components/spinner";

export const Route = createFileRoute("/")({
  component: Index,
});

const path = [
  {
    alt: "bread-slidebg-01",
    src: "images/slides/bread-slidebg-01.jpg",
  },
  {
    alt: "bread-slidebg-02",
    src: "images/slides/bread-slidebg-02.jpg",
  },
  {
    alt: "bread-slidebg-03",
    src: "images/slides/bread-slidebg-03.jpg",
  },
  {
    alt: "bread-slidebg-04",
    src: "images/slides/bread-slidebg-04.jpg",
  },
];

function Index() {
  const { data, isPending, isError, error, refetch } = useQuery(
    createNewsQueryOptions()
  );

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
    <figure className="relative w-full h-[100dvh] min-h-screen m-0 p-0 z-0">
      <Swiper
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        speed={5000}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-[100vh] min-h-screen"
      >
        {path.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              className="object-cover w-full h-[100dvh] min-h-screen"
              src={item.src}
              alt={item.alt}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <figcaption className="absolute z-20 flex flex-col gap-4 left-1/2 -translate-x-1/2 top-50 md:top-60 md:left-50 md:-translate-x-0 w-[90vw] max-w-lg md:max-w-xl lg:max-w-2xl">
        <h2 className="text-green-gold text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg">
          Nyheder
        </h2>
        <section className="overflow-y-auto  max-h-100 sm:max-h-80 md:max-h-96 flex flex-col gap-4 bg-dark-grey/80 p-3 sm:p-4 md:p-6 rounded-md border-black border-2 text-white shadow-lg backdrop-blur-sm">
          {!isPending && data ? (
            // only the first three of the array
            data.slice(0, 3).map((item) => (
              <figure
                key={item.id}
                className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center sm:items-start"
              >
                <img
                  className="w-full sm:w-42 md:w-50 h-24 sm:h-20 object-cover rounded"
                  src={item.imageUrl}
                  alt={item.title}
                />
                <figcaption className="w-full">
                  <p className="font-light text-xs sm:text-sm mb-1">
                    {/* make so user can read the time */}
                    {new Date(item.createdAt).toLocaleDateString("da-DK", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="font-bold text-base sm:text-lg mb-1 line-clamp-1">
                    {item.title}
                  </p>
                  <article className="font-light text-sm sm:text-base line-clamp-2 sm:line-clamp-3">
                    {item.teaser}
                  </article>
                </figcaption>
              </figure>
            ))
          ) : (
            <Spinner />
          )}
        </section>
      </figcaption>
    </figure>
  );
}
