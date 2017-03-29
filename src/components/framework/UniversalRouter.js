import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router';

export default class UniversalRouter extends Component {
  render() {
    const { path } = this.props;

    if (typeof window === 'undefined') {
      return (
        <StaticRouter location={ path } context={ {} }>
          { this.props.children }
        </StaticRouter>
      );
    } else {
      return <BrowserRouter>{ this.props.children }</BrowserRouter>;
    }
  }
}
