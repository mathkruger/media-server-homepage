import { useState, useEffect } from "preact/hooks";
import { html } from "htm/preact";
import { LinkItem } from "../components/link-item.js";
import { login } from "../services/auth.js";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  async function handleLogin() {
    setError(false);
    const result = await login({ username, password });
    if (!result) {
      setError(true);
    } else {
      window.location = '/admin';
    }
  }

  return html`
    <main class="container m-auto px-4">
      <h1>Login</h1>

      <input type="text" placeholder="Nome de usuário" onChange=${(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Senha" onChange=${(e) => setPassword(e.target.value)} />

      <button onClick=${() => handleLogin()}>Entrar</button>
      
    </main>
  `;
}
