import { render, html } from '../vendor/preact.module.js';

import { Home } from './pages/home.js';
import { Header } from './components/header.js';

function App() {
  return html`
    <${Header} />
    <${Home} />
  `;
}

render(html`<${App} />`, document.body);
