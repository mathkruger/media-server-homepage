import * as http from "node:http";

import { handleRoute } from "./core/handle-route.js";
import { routes } from "./routes.js";

const PORT = Number(process.argv[2] || "8088");

http
  .createServer(async (req, res) => {
    console.log(`${req.method} ${req.url}`);
    await handleRoute(req, routes)(req, res);
  })
  .listen(PORT);
