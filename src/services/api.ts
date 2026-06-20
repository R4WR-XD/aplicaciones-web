import axios from "axios";

export const api = axios.create({
  baseURL: "https://aplicaciones-web-2urn.vercel.app/"
});