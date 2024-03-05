import HTTPClient from "./http-client/index.js";
const { VITE_API_URL } = import.meta.env;

export const api = new HTTPClient({ baseURL: VITE_API_URL });
