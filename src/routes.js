import { handleSystemRoute } from "./controllers/system.js";

export const routes = [
  {
    method: "GET",
    path: "/api/system",
    controller: handleSystemRoute
  }
];