import * as fs from "node:fs";
import * as http from "node:http";
import * as path from "node:path";
import { getCpuUsage, getMemoryUsage } from "./utils.js";

const PORT = Number(process.argv[2] || "8088");

const MIME_TYPES = {
	default: "application/octet-stream",
	html: "text/html; charset=UTF-8",
	js: "application/javascript",
	css: "text/css",
	png: "image/png",
	jpg: "image/jpg",
	gif: "image/gif",
	ico: "image/x-icon",
	svg: "image/svg+xml",
	json: "application/json",
};

const STATIC_PATH = path.join(process.cwd(), "./static");

const toBool = [() => true, () => false];

const prepareFile = async (url) => {
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
};

const sendStaticFile = async (req, res) => {
	const file = await prepareFile(req.url);
	const statusCode = file.found ? 200 : 404;
  const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;

  res.writeHead(statusCode, { "Content-Type": mimeType });
  file.stream.pipe(res);
};

const handleSystemRoute = async (req, res) => {
	if (req.method === "GET") {
		const cpuAvarage = getCpuUsage();
		const memoryUsage = getMemoryUsage();
		const result = {
			...cpuAvarage,
			...memoryUsage,
		};
	
		res.writeHead(200, { "Content-Type": MIME_TYPES.json });
		res.end(JSON.stringify(result));
	} else {
		res.writeHead(504);
		res.end();
	}
}

http.createServer(async (req, res) => {
	console.log(`${req.method} ${req.url}`);

	if (req.url.endsWith("/api/system")) {
		await handleSystemRoute(req, res);		
	} else {
		await sendStaticFile(req, res);
	}
}).listen(PORT);

