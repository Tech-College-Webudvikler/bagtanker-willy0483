import { api } from "@/lib/api";
import type { CategoryList } from "@/lib/types";
import { queryOptions } from "@tanstack/react-query";

export const createCategoryProductsQueryOptions = (slug: string) => {
  return queryOptions({
    queryKey: ["categories", slug],
    queryFn: () => getCategories(slug),
  });
};

const getCategories = async (slug: string): Promise<CategoryList> => {
  return await api.products.get("categories", slug);
};
