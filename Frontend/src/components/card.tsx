import type { T_Product } from "@/lib/types";
import { Link } from "@tanstack/react-router";

const Card = ({ title, imageUrl, description, slug }: T_Product) => {
  return (
    <figure className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 md:w-40 object-cover"
      />
      <figcaption className="p-4 flex flex-col gap-2 justify-center md:flex-1">
        <p className="text-lg font-semibold text-gray-800">{title}</p>
        <article className="text-gray-600 text-sm">{description}</article>
        <Link to="/products/$product" params={{ product: slug }}>
          <button className="hover:cursor-pointer mt-2 px-4 py-2 bg-green-gold text-white rounded hover:bg-green-700 transition">
            Læs mere
          </button>
        </Link>
      </figcaption>
    </figure>
  );
};
export default Card;
