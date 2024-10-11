import { MIME_TYPES } from "../consts/mime-types.mjs";
import { createUser, deleteUser, listUsers } from "../services/users.mjs";
import { once } from "node:events";

export const usersController = {
  list: async (_, res) => {
    const list = await listUsers();

    res.writeHead(200, { "Content-Type": MIME_TYPES.json });
		res.end(JSON.stringify(list));
  },
  create: async (req, res) => {
    const data = JSON.parse(await once(req, "data"));

    await createUser(data);
    res.writeHead(200, { "Content-Type": MIME_TYPES.json });
		res.end(JSON.stringify({
      message: "User created!"
    }));
  },
  delete: async (req, res) => {
    const data = JSON.parse(await once(req, "data"));

    await deleteUser(data.id);
    res.writeHead(200, { "Content-Type": MIME_TYPES.json });
		res.end(JSON.stringify({
      message: "User deleted!"
    }));
  }
}