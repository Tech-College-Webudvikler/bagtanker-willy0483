import { queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { T_Category } from "@/lib/types";

export const createCategoriesQueryOptions = () => {
  return queryOptions({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

const getCategories = async (): Promise<T_Category[]> => {
  return await api.get("categories");
};
