import sqlbricks from "sql-bricks";
const { select, insertInto, deleteFrom } = sqlbricks;
import { database } from "../database/database.mjs";

export async function listServices() {
  const query = select().from("services").toString();

  return new Promise((resolve, reject) => {
    database.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export async function createService(data) {
  const { text, values } = insertInto("services", [data]).toParams({
    placeholder: "?",
  });
  const statement = database.prepare(text);

  return new Promise((resolve, reject) => {
    statement.run(...values, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export async function deleteService(id) {
  const { text, values } = deleteFrom("services")
    .where("id", id)
    .toParams({ placeholder: "?" });

  const statement = database.prepare(text);

  return new Promise((resolve, reject) => {
    statement.run(...values, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
