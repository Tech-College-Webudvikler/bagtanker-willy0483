import { queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { T_Message } from "@/lib/types";

export const createMessagesDetailsQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ["messagesDetails", id],
    queryFn: () => getMessagesDetails(id),
  });
};

const getMessagesDetails = async (id: number): Promise<T_Message[]> => {
  return await api.messages.get("messages", id);
};
