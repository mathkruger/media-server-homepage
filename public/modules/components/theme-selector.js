import { html, useState, useEffect } from "../../vendor/preact.module.js";

const THEMES = [
  {
    label: "Padrão",
    value: "default",
  },
  {
    label: "Retro",
    value: "retro",
  },
  {
    label: "Cyberpunk",
    value: "cyberpunk",
  },
  {
    label: "Valentine",
    value: "valentine",
  },
  {
    label: "Aqua",
    value: "aqua",
  },
  {
    label: "Cupcake",
    value: "cupcake",
  },
  {
    label: "Bumbeblee",
    value: "bumblebee",
  },
  {
    label: "Halloween",
    value: "halloween",
  },
];

export function ThemeSelector() {
  const [theme, setTheme] = useState(
    window.localStorage.getItem("theme") ?? 'default'
  );

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  function changeTheme(theme) {
    window.localStorage.setItem("theme", theme);
  }

  function getCurrentThemeLabel() {
    return THEMES.find(x => x.value === theme)?.label ?? 'Tema';
  }

  return html`
    <div class="dropdown lg:dropdown-end">
      <div tabindex="0" role="button" class="btn m-1">
        ${getCurrentThemeLabel()}
        <svg
          width="12px"
          height="12px"
          class="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path
            d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"
          ></path>
        </svg>
      </div>
      <ul
        tabindex="0"
        class="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl"
      >
        ${THEMES.map(
          (x) => html`
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="${x.label}"
                value="${x.value}"
                onChange=${(e) => setTheme(e.target.value)}
                checked=${theme === x.value}
              />
            </li>
          `
        )}
      </ul>
    </div>
  `;
}
