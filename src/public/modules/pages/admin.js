import { html } from "htm/preact";
import { useState, useEffect } from "preact/hooks";
import { getUsers, createUser } from "../services/user.js";

export function Admin() {
  const [users, setUsers] = useState([]);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  async function loadUsers() {
    const list = await getUsers();
    setUsers(list);
  }

  async function createNewUser() {
    const user = await createUser({
      username: newUsername,
      password: newPassword,
    });

    if (user) {
      setUsers([...users, user]);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return html`
    <main class="container m-auto px-4">
      <h1 class="text-5xl font-bold mb-4">Admin</h1>

      <div class="flex gap-4">
        <div class="w-full overflow-x-auto">
          <h2>Usuários</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Usuário</th>
              </tr>
            </thead>
            <tbody>
              ${users.map(
                (x) =>
                  html`
                    <tr>
                      <td>${x.id}</th>
                      <td>${x.username}</td>
                    </tr>
                  `
              )}
            </tbody>
          </table>
        </div>

        <div class="w-full flex flex-col gap-4">
          <h2>Novo usuário</h2>
          <label class="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="h-4 w-4 opacity-70"
            >
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
              />
            </svg>
            <input
              type="text"
              class="grow"
              placeholder="Usuário"
              onChange=${(e) => setNewUsername(e.target.value)}
            />
          </label>
          <label class="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="h-4 w-4 opacity-70"
            >
              <path
                fill-rule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clip-rule="evenodd"
              />
            </svg>
            <input
              type="text"
              class="grow"
              placeholder="Senha"
              onChange=${(e) => setNewPassword(e.target.value)}
            />
          </label>

          <button
            class="btn btn-wide btn-primary w-full mt-4"
            onClick=${() => createNewUser()}
          >
            Salvar
          </button>
        </div>
      </div>
    </main>
  `;
}
