import { BACKEND_URL } from "./constants";
import type { Reviews_Create } from "./types";

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
  reviews: {
    async get(url: string, id?: number) {
      const endpoint = id
        ? `${BACKEND_URL}/${url}/${id}`
        : `${BACKEND_URL}/${url}`;
      const res = await fetch(endpoint);
      const data = await res.json();
      return data;
    },

    async post(data: Reviews_Create) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const res = await fetch(`${BACKEND_URL}/reviews`, options);
      if (!res.ok) {
        throw new Error(
          `API Error: ${res.status} ${res.statusText} ${res.text}`
        );
      }
      return res.json();
    },
  },
  async get(url: string) {
    const endpoint = `${BACKEND_URL}/${url}`;

    const res = await fetch(endpoint);
    const data = await res.json();
    return data;
  },
};
