import { servicesController } from "./controllers/services.mjs";
import { systemController } from "./controllers/system.mjs";

export const routes = [
  {
    method: "GET",
    path: "/api/system",
    controller: systemController.get
  },
  {
    method: "GET",
    path: "/api/services",
    controller: servicesController.list
  },
  {
    method: "POST",
    path: "/api/services",
    controller: servicesController.create
  },
  {
    method: "POST",
    path: "/api/services/delete",
    controller: servicesController.delete
  },
  {
    method: "POST",
    path: "/api/services/ping",
    controller: servicesController.ping
  }
];