import { render } from 'preact';
import { html } from 'htm/preact';
import { Home } from './pages/home.js';
import { Header } from './components/header.js';

function App() {
  return html`
    <${Header} />
    <${Home} />
  `;
}

render(html`<${App} />`, document.body);
