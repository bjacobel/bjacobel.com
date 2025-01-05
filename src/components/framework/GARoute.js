import React, { Component, createElement } from 'react';
import { Route } from 'wouter-preact';
import ReactGA from 'react-ga';

export default class GARoute extends Component {
  render() {
    const { path, ssrPathContext, exact, component } = this.props;

    return (
      <Route
        path={ path }
        exact={ exact }
      >
        { (matchProps) => {
          if (typeof window !== 'undefined') {
            ReactGA.pageview(ssrPathContext || window.location.pathname);
          }

          return createElement(component, matchProps);
        } }
      </Route>
    );
  }
}
