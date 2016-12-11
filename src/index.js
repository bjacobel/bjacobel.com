import React from 'react';
import { render } from 'react-dom';
import serverRender from 'preact-render-to-string';
import 'preact/devtools';

import './stylesheets/index.scss';
import Main from './components/Main';
import template from './index.html.ejs';

if (typeof document !== 'undefined') {
  const rootEl = document.getElementById('main');

  const renderToDOM = () => {
    // See here for explanation of why this require() is needed:
    // https://github.com/reactjs/redux/pull/1455/files#r54380102
    const HotMain = require('./components/Main').default; // eslint-disable-line global-require

    render(
      <HotMain />,
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
  return template({
    serverHtml: serverRender(<Main path={ locals.path } />),
    serverRender: true,
  });
};
