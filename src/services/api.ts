import axios from "axios";

export const api = axios.create({
  baseURL: "https://aplicaciones-web-2urn-92cvqeiak-sorrowofspiras-projects.vercel.app/v1"
});