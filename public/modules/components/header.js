import { html } from "../../vendor/preact.module.js";
import { ThemeSelector } from "./theme-selector.js";

export function Header() {
  return html`
    <header class="p-4 flex items-center justify-between md:flex-row flex-col mb-8 border-b-4 border-neutral">
      <${ThemeSelector} />
      <img
        src="images/logo.png"
        class="w-96 m-auto"
        alt="Krugerflix"
        title="Krugerflix"
      />
      <a href="/admin" class="btn">Admin</a>
    </header>
  `;
}
