import React, { Component, createElement } from 'react';
import { Match } from 'react-router';
import ReactGA from 'react-ga';

import { TRACK_ANALYTICS } from '../constants';

export default class AnalyticsMatch extends Component {
  render() {
    const { pattern, exactly, component } = this.props;

    return (
      <Match
        pattern={ pattern }
        exactly={ exactly }
        render={ () => {
          if (TRACK_ANALYTICS) {
            ReactGA.pageview(window.location.pathname);
          }

          return createElement(component);
        } }
      />
    );
  }
}
