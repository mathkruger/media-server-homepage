import { MIME_TYPES } from "../consts/mime-types.mjs";
import { getMemoryUsage, getCpuUsage } from "../services/system.mjs";

export const systemController = {
	get: (_, res) => {
		const cpuAvarage = getCpuUsage();
		const memoryUsage = getMemoryUsage();
		
		const result = {
			...cpuAvarage,
			...memoryUsage,
		};
		
		res.writeHead(200, { "Content-Type": MIME_TYPES.json });
		res.end(JSON.stringify(result));
	},
};