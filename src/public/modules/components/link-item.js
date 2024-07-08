import { html } from 'htm/preact';

export function LinkItem({ link }) {
  function getCurrentUrl() {
    return `http://${window.location.hostname}`;
  }

  return html`
    <li class="card bg-base-100 w-96 shadow-xl">
      <figure class="m-auto mt-10 p-4 mask mask-squircle icon bg-base-200">
        <div
          class="icon"
          style="background-image: url('/images/${link.imageUrl}')"
        ></div>
      </figure>

      <div class="card-body items-center text-center">
        <h2 class="card-title">${link.name}</h2>
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
    </li>
  `;
}
