import * as fs from "node:fs/promises";
import * as path from "node:path";
import { MIME_TYPES } from "../consts/mime-types.mjs";

export const pagesController = {
  getPage: async (page, res) => {
    const file = await fs
      .readFile(
        path.join(process.cwd(), "src", "pages", `${page}.html`)
      )
      .then((x) => x.toString());

    res.writeHead(200, { "Content-Type": MIME_TYPES.html });
    res.end(file);
  },
};
