import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="title">
          <h1 className="aboutme myname">Brian Jacobel</h1>
          <div className="separator" />
          <h2 className="aboutme mytitle">Web Developer</h2>
        </div>
      </div>
    );
  }
}
