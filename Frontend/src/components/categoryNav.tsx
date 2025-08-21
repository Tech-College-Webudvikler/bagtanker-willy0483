import { createCategoriesQueryOptions } from "@/queryOptions/createCategoriesQueryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

const CategoryNav = () => {
  const { data } = useSuspenseQuery(createCategoriesQueryOptions());

  return (
    <nav className="w-full mt-[150px]">
      <ul className="flex flex-wrap gap-6 py-3 justify-center bg-dark-grey">
        <li>
          <Link
            to="/products"
            className="px-3 py-1 rounded-full bg-blue-grey text-white hover:bg-green-gold transition"
          >
            Alle
          </Link>
        </li>
        {data?.map((category) => (
          <li key={category.id}>
            <Link
              to="/products/category/$category"
              params={{ category: category.slug }}
              className="[&.active]:text-green-gold text-white"
            >
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default CategoryNav;
