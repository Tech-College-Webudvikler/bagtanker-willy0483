import { BACKEND_URL } from "./constants";

export const api = {
  products: {
    async get(url: string, slug?: string) {
      const endpoint = slug
        ? `${BACKEND_URL}/${url}/${slug}`
        : `${BACKEND_URL}/${url}`;
      const res = await fetch(endpoint);
      const data = await res.json();
      return data;
    },
  },
  messages: {
    async get(url: string, id?: number) {
      const endpoint = id
        ? `${BACKEND_URL}/${url}/${id}`
        : `${BACKEND_URL}/${url}`;
      const res = await fetch(endpoint);
      const data = await res.json();
      return data;
    },
  },
  async get(url: string) {
    const endpoint = `${BACKEND_URL}/${url}`;

    const res = await fetch(endpoint);
    const data = await res.json();
    return data;
  },
};
