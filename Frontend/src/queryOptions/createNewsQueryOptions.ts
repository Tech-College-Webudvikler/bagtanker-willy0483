import { queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { T_News } from "@/lib/types";

export const createNewsQueryOptions = () => {
  return queryOptions({
    queryKey: ["news"],
    queryFn: getNews,
  });
};

const getNews = async (): Promise<T_News[]> => {
  return await api.get("news");
};
