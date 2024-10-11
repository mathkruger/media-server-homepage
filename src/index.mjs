import * as http from "node:http";

import { handleRoute } from "./core/handle-route.mjs";
import { routes } from "./routes.mjs";
import { MIME_TYPES } from "./consts/mime-types.mjs";
import { createUser } from "./services/users.mjs";

const PORT = Number(process.argv[2] || "8088");
const seed = process.argv[3];

if (seed) {
  createUser({ username: 'admin', password: 'admin' }).then(() => console.log("user created <3"));
}

http
  .createServer(async (req, res) => {
    try {
      console.log(`${req.method} ${req.url}`);
      await (await handleRoute(req, routes))(req, res);
    } catch (error) {
      console.log(error);
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
