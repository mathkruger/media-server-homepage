import { MIME_TYPES } from "../consts/mime-types.mjs";
import { createService, deleteService, listServices } from "../services/services.mjs";
import { once } from "node:events";

export const servicesController = {
  list: async (_, res) => {
    const list = await listServices();

    res.writeHead(200, { "Content-Type": MIME_TYPES.json });
		res.end(JSON.stringify(list));
  },
  create: async (req, res) => {
    const data = JSON.parse(await once(req, "data"));

    await createService(data);
    res.writeHead(200, { "Content-Type": MIME_TYPES.json });
		res.end(JSON.stringify({
      message: "Service created!"
    }));
  },
  delete: async (req, res) => {
    const data = JSON.parse(await once(req, "data"));

    await deleteService(data.id);
    res.writeHead(200, { "Content-Type": MIME_TYPES.json });
		res.end(JSON.stringify({
      message: "Service deleted!"
    }));
  },
};