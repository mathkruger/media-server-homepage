import { useState, useEffect, html } from "../../vendor/preact.module.js";

export function LinkItem({ link }) {
  const [status, setStatus] = useState(false);

  function getCurrentUrl() {
    return `http://${window.location.hostname}`;
  }

  useEffect(() => {
    fetch(`${getCurrentUrl()}:${link.port}${link.health_url}`).then((x) => {
      setStatus(true);
    }).catch(() => {
      setStatus(false);
    });
  });

  return html`
  <li class="indicator">
    <span class="indicator-item badge badge-${status ? 'success' : 'error'}"></span>
    <div class="card bg-base-300 w-96 shadow-xl">
      <figure class="m-auto mt-10 p-4 mask mask-squircle icon bg-base-200">
        <div
          class="icon"
          style="background-image: url('/images/${link.img_url}')"
        ></div>
      </figure>

      <div class="card-body items-center text-center">
        <h2 class="card-title">${link.title}</h2>
        <p>${link.description}</p>
        <div class="card-actions">
          <a
            target="_blank"
            rel="noopener"
            href="${getCurrentUrl()}:${link.port}"
            class="btn btn-primary"
          >
            Entrar
          </a>
        </div>
      </div>
    </div>
  </li>
  `;
}
