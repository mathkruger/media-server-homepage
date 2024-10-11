import * as http from "node:http";

import { handleRoute } from "./core/handle-route.mjs";
import { routes } from "./routes.mjs";
import { MIME_TYPES } from "./consts/mime-types.mjs";

const PORT = Number(process.argv[2] || "8088");

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
          error: JSON.stringify(error)
        })
      );
    }
  })
  .listen(PORT);
