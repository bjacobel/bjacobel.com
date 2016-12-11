import React, { Component, createElement } from 'react';
import { Match } from 'react-router';
import ReactGA from 'react-ga';

export default class AnalyticsMatch extends Component {
  render() {
    const { path, pattern, exactly, component } = this.props;

    return (
      <Match
        pattern={ pattern }
        exactly={ exactly }
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
