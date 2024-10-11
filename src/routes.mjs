import { pagesController } from "./controllers/pages.mjs";
import { servicesController } from "./controllers/services.mjs";
import { systemController } from "./controllers/system.mjs";
import { usersController } from "./controllers/users.mjs";

export const routes = [
  // System
  {
    method: "GET",
    path: "/api/system",
    controller: systemController.get,
  },

  // Services
  {
    method: "GET",
    path: "/api/services",
    controller: servicesController.list,
  },
  {
    method: "POST",
    path: "/api/services",
    auth: true,
    controller: servicesController.create,
  },
  {
    method: "POST",
    path: "/api/services/delete",
    auth: true,
    controller: servicesController.delete,
  },
  {
    method: "POST",
    path: "/api/services/ping",
    controller: servicesController.ping,
  },

  // Admin Pages
  {
    method: "GET",
    path: "/admin",
    auth: true,
    controller: (_, res) => pagesController.getPage("admin", res),
  },
  {
    method: "GET",
    path: "/admin/manage-services",
    auth: true,
    controller: (_, res) => pagesController.getPage("manage-services", res),
  },
  {
    method: "GET",
    path: "/admin/manage-users",
    auth: true,
    controller: (_, res) => pagesController.getPage("manage-users", res),
  },

  // Users
  {
    method: "GET",
    path: "/api/users",
    auth: true,
    controller: usersController.list,
  },
  {
    method: "POST",
    path: "/api/users",
    auth: true,
    controller: usersController.create,
  },
  {
    method: "POST",
    path: "/api/users/delete",
    auth: true,
    controller: usersController.delete,
  },
];
