import { checkIfUserExists } from "../services/users.mjs";

export async function checkUserAuthenticated(req) {
  const userpass = Buffer.from(
    (req.headers.authorization || "").split(" ")[1] || "",
    "base64"
  ).toString();

  const [ username, password ] = userpass.split(":");
  return checkIfUserExists({ username, password });
}
