import { html } from "htm/preact";
import { ThemeSelector } from "./theme-selector.js";

export function Header() {
  return html`
    <header class="container m-auto px-4">
      <div class="md:absolute md:top-4 md:right-4">
        <${ThemeSelector} />
      </div>
      <img
        src="images/logo.png"
        class="w-96 m-auto"
        alt="Krugerflix"
        title="Krugerflix"
      />
    </header>
  `;
}
