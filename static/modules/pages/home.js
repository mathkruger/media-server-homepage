import { useState, useEffect, html } from "../../vendor/preact.module.js";
import { LinkItem } from "../components/link-item.js";

export function Home() {
  const [links, setLinks] = useState([]);
  const [system, setSystem] = useState({});
	
  useEffect(() => {
    fetch("/api/services")
      .then((x) => x.json())
      .then((results) => {
        setLinks(results);
      });
    
    fetch("/api/system")
      .then((x) => x.json())
      .then(result => {
        setSystem(result);
      });
  }, []);

  return html`
    <main class="container m-auto px-4">
      <ul id="links-container" class="flex flex-wrap justify-evenly gap-4 mb-4">
        ${links.map((x) => html`<${LinkItem} link=${x} />`)}
      </ul>
      
      <div class="card bg-secondary text-primary-content mb-2 px-4">
        <div class="card-body">
          <h3 class="card-title">Sistema</h3>
          <p>RAM: ${system.usedMemory}/${system.totalMemory} (Livre: ${system.freeMemory})</p>
          <p>CPU: ${system.lastMinute?.toFixed(2)}% / ${system.lastFiveMinutes?.toFixed(2)}% / ${system.lastFifteenMinutes?.toFixed(2)}%</p>
        </div>
      </div>
    </main>
  `;
}
