import sqlbricks from "sql-bricks";
const { select, insertInto, deleteFrom } = sqlbricks;
import { all, get, runStatement } from "../database/database.mjs";
import { comparePassword, cryptPassword } from "../core/hash.mjs";

export async function checkIfUserExists({ username, password }) {
  const query = select().from("users").where("username", username).toString();
  const user = await get(query);

  if (!user) {
    return false;
  }

  return comparePassword(password, user.password);
}

export async function createUser({ username, password }) {
  const hashedPassword = cryptPassword(password);
  const data = {
    username,
    password: hashedPassword
  };

  const { text, values } = insertInto("users", [data]).toParams({
    placeholder: "?",
  });
  
  return runStatement(text, values);
}

export async function listUsers() {
  const query = select("id", "username").from("users").toString();
  return all(query);
}

export async function deleteUser(id) {
  const { text, values } = deleteFrom("users")
    .where("id", id)
    .toParams({ placeholder: "?" });

  return runStatement(text, values);
}