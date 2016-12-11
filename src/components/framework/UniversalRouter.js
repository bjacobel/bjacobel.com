import React, { Component } from 'react';
import { BrowserRouter, ServerRouter, createServerRenderContext } from 'react-router';

export default class UniversalRouter extends Component {
  render() {
    const { node } = this.props;

    if (node) {
      return (
        <ServerRouter location={ this.props.path } context={ createServerRenderContext() }>
          { this.props.children }
        </ServerRouter>
      );
    } else {
      return <BrowserRouter>{ this.props.children }</BrowserRouter>;
    }
  }
};
