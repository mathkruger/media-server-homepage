import * as path from "node:path";
import * as fs from "node:fs";
import { MIME_TYPES } from "../consts/mime-types.js";

async function prepareFile(url) {
  const STATIC_PATH = path.join(process.cwd(), "./static");
  const toBool = [() => true, () => false];
  const paths = [STATIC_PATH, url];

  if (url.endsWith("/")) {
    paths.push("index.html");
  }

  const filePath = path.join(...paths);
  const pathTransversal = !filePath.startsWith(STATIC_PATH);
  const exists = await fs.promises.access(filePath).then(...toBool);
  const found = !pathTransversal && exists;
  const streamPath = found ? filePath : STATIC_PATH + "/404.html";

  const ext = path.extname(streamPath).substring(1).toLowerCase();
  const stream = fs.createReadStream(streamPath);
  return { found, ext, stream };
}

export async function handleStaticFiles(req, res) {
  const file = await prepareFile(req.url);
  const statusCode = file.found ? 200 : 404;
  const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;

  res.writeHead(statusCode, { "Content-Type": mimeType });
  file.stream.pipe(res);
}
