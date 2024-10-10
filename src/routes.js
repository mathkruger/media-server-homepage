import { servicesController } from "./controllers/services.js";
import { systemController } from "./controllers/system.js";

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
  }
];