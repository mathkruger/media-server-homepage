import { useState, useEffect } from "preact/hooks";
import { html } from "htm/preact";
import { LinkItem } from "../components/link-item.js";

export function Home() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetch("/links.json")
      .then((x) => x.json())
      .then((results) => {
        setLinks(results);
      });
  }, []);

  return html`
    <main class="container m-auto px-4">
      <ul id="links-container" class="flex flex-wrap justify-evenly gap-4">
        ${links.map((x) => html`<${LinkItem} link=${x} />`)}
      </ul>
    </main>
  `;
}
