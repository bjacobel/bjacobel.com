import React from 'react';  // eslint-disable-line import/no-duplicates
import { render } from 'react-dom';  // eslint-disable-line import/no-duplicates
import serverRender from 'preact-render-to-string';  // eslint-disable-line import/extensions
import 'preact/devtools';

import './stylesheets/index.scss';
import Main from './components/Main';
import template from './index.html.ejs';

if (typeof document !== 'undefined') {
  const rootEl = document.getElementById('main');

  const renderToDOM = () => {
    render(
      <Main />,
      rootEl,
    );
  };

  if (module.hot) {
    module.hot.accept('./components/Main', () => {
      renderToDOM();
    });
  }

  renderToDOM();
}

export default (locals) => {
  const assets = Object.keys(locals.webpackStats.compilation.assets);
  return template({
    html: serverRender(<Main path={ locals.path } />),
    css: assets.filter(value => value.match(/\.css$/)),
    js: assets.filter(value => value.match(/\.js$/)),
  });
};
