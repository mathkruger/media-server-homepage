import * as os from "node:os";

function niceBytes(x) {
	const units = ["bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
	let l = 0, n = parseInt(x, 10) || 0;

	while(n >= 1024 && ++l) {
		n = n/1024;
	}

	return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l]);
}

export function getCpuUsage() {
	const cpuAvg = os.loadavg();
	return {
		lastMinute: cpuAvg[0] * 100,
		lastFiveMinutes: cpuAvg[1] * 100,
		lastFifteenMinutes: cpuAvg[2] * 100,
  };
}

export function getMemoryUsage() {
	const total = os.totalmem();
	const free = os.freemem();
	return {
		totalMemory: niceBytes(total),
		freeMemory: niceBytes(free),
		usedMemory: niceBytes(total - free),
	};
}
