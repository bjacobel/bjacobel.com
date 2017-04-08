import React, { Component, createElement } from 'react';
import { Route } from 'react-router-dom';
import ReactGA from 'react-ga';

export default class GARoute extends Component {
  render() {
    const { path, pattern, exact, component } = this.props;

    return (
      <Route
        path={ pattern }
        exact={ exact }
        render={ (matchProps) => {
          if (typeof window !== 'undefined') {
            ReactGA.pageview(path || window.location.pathname);
          }

          return createElement(component, matchProps);
        } }
      />
    );
  }
}
