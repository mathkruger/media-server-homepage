import { MIME_TYPES } from "../consts/mime-types.js";
import { getMemoryUsage, getCpuUsage } from "../services/system.js";

export async function handleSystemRoute(req, res) {
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