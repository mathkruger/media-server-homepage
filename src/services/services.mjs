import sqlbricks from "sql-bricks";
const { select, insertInto, deleteFrom } = sqlbricks;
import { all, runStatement } from "../database/database.mjs";

export async function listServices() {
  const query = select().from("services").toString();
  return all(query);
}

export async function createService(data) {
  const { text, values } = insertInto("services", [data]).toParams({
    placeholder: "?",
  });
  
  return runStatement(text, values);
}

export async function deleteService(id) {
  const { text, values } = deleteFrom("services")
    .where("id", id)
    .toParams({ placeholder: "?" });

  return runStatement(text, values);
}
