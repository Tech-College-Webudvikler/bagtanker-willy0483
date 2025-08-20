import { queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { T_Product, T_ProductDetails } from "@/lib/types";

export const createProductsQueryOptions = () => {
  return queryOptions({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

export const createProductDetailsQueryOptions = (slug: string) => {
  return queryOptions({
    queryKey: ["products", slug],
    queryFn: () => getProductDetails(slug),
  });
};

const getProducts = async (): Promise<T_Product[]> => {
  return await api.products.get("products");
};

const getProductDetails = async (slug: string): Promise<T_ProductDetails> => {
  return await api.products.get("products", slug);
};
