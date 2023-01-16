import React, { Component } from 'react';

import setTitle from '../../services/windowTitle';


export default class StaticPage extends Component {
  componentDidMount() {
    setTitle('About');
  }

  render() {
    return (
      <div>
        <p className="post-title">
          Hi, I'm Brian. I'm a software excited about performance, reliability, accessibility and frontend infrastructure.
        </p>
        <p>
          I'm currently working full-time remote in New Hampshire. In my free time, I don't stop writing code:
          my projects have included an open-source newsroom CMS and a bookmarking tool for animated GIFs.
          I'm passionate about quality software that makes an impact, modern web features and standards,
          and the idea of transforming areas like media and government through the Open Web.
          Please use this page to check out what I'm working on and to get in touch.
        </p>
      </div>
    );
  }
}
