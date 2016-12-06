import React from 'react';
import { render } from 'react-dom';
import './stylesheets/index.scss';

const rootEl = document.getElementById('main');
const renderToDOM = () => {
  // See here for explanation of why this require() is needed:
  // https://github.com/reactjs/redux/pull/1455/files#r54380102
  const Main = require('./components/Main').default; // eslint-disable-line global-require

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
