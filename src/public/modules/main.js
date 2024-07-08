import { render } from "preact";
import { html } from "htm/preact";
import { Router } from "preact-router";

import { Header } from "./components/header.js";
import { Home } from "./pages/home.js";
import { Login } from "./pages/login.js";
import { userLoggedIn } from "./services/auth.js";
import { Admin } from "./pages/admin.js";

function App() {
  return html`
    <${Header} />

    <${Router}>
      <${Home} path="/" />
      <${Login} path="/login" />

      ${
        userLoggedIn.value &&
        html`
          <${Admin} path="/admin" />
        `
      }
    <//>
  `;
}

render(html`<${App} />`, document.body);
