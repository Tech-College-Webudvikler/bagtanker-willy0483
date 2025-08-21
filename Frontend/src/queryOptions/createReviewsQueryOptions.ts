import { queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { T_Reviews } from "@/lib/types";

export const createReviewsDetailsQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ["reviewsDetails", id],
    queryFn: () => getReviewsDetails(id),
  });
};

const getReviewsDetails = async (id: number): Promise<T_Reviews[]> => {
  return await api.reviews.get("reviews/byProduct", id);
};
