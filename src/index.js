import * as http from "node:http";

import { handleRoute } from "./core/handle-route.js";
import { routes } from "./routes.js";
import { seed } from "./database/database.js";

const PORT = Number(process.argv[2] || "8088");

seed();

http
  .createServer(async (req, res) => {
    try {
      console.log(`${req.method} ${req.url}`);
      await handleRoute(req, routes)(req, res);
    } catch (error) {
      res.writeHead(500, { "Content-Type": MIME_TYPES.json });
      res.end(
        JSON.stringify({
          message: `Error at calling the route ${req.url}`,
        })
      );
    }
  })
  .listen(PORT);
