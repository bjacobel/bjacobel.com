import React, { Component } from 'react';
import { BrowserRouter, ServerRouter, createServerRenderContext } from 'react-router';

export default class UniversalRouter extends Component {
  render() {
    const { path } = this.props;

    if (typeof window === 'undefined') {
      return (
        <ServerRouter location={ path } context={ createServerRenderContext() }>
          { this.props.children }
        </ServerRouter>
      );
    } else {
      return <BrowserRouter>{ this.props.children }</BrowserRouter>;
    }
  }
}
