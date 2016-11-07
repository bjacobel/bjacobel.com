import React, { Component } from 'react';

export default class StaticPage extends Component {
  render() {
    return (
      <div>
        <p className="post-title">
          Hi, I'm Brian. I'm a web developer excited about journalism, education, agile government and privacy.
        </p>
        <p>
          I'm currently working as a software engineer in Boston. In my free time, I don't stop writing code:
          my projects have included an open-source newsroom CMS and a bookmarking tool for animated GIFs.
          I'm passionate about quality software that makes an impact, modern web features and standards,
          and the idea of transforming areas like education and government through the Open Web.
          Please use this page to check out what I'm working on and to get in touch.
        </p>
      </div>
    );
  }
}
