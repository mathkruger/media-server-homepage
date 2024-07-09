import { useState, useEffect } from "preact/hooks";
import { html } from "htm/preact";
import { login, userLoggedIn } from "../services/auth.js";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  async function handleLogin() {
    setError(false);
    const result = await login({ username, password });
    if (!result) {
      setError(true);
    }
  }
  
  useEffect(() => {
    if (userLoggedIn.value === true) {
      window.location = "/admin";
    }
  });

  return html`
    <main class="container m-auto px-4">
      <h1 class="text-5xl font-bold mb-4">Login</h1>

      <div class="flex flex-col gap-4">
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
          <input type="text" class="grow" placeholder="Usuário" onChange=${(e) => setUsername(e.target.value)} />
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
          <input type="password" class="grow" placeholder="Senha" onChange=${(e) => setPassword(e.target.value)} />
        </label>
      </div>

      <button class="btn btn-wide btn-primary w-full mt-4" onClick=${() => handleLogin()}>Entrar</button>
      ${error && html` <p>Erro ao logar!</p> `}
    </main>
  `;
}
