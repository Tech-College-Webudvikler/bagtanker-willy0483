import { BACKEND_URL } from "./constants";

export const api = {
  async get(url: string) {
    const res = await fetch(`${BACKEND_URL}/${url}`);
    const data = await res.json();
    return data;
  },
};
