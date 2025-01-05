import React, { Component } from 'react';
import { Link } from 'wouter';

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="headshot" />
        <div className="container">
          <Link to="/" className="nav-item about">about</Link>
          <Link to="/projects/" className="nav-item projects">projects</Link>
          <Link to="/work/" className="nav-item work">work</Link>
          <Link to="/blog/" className="nav-item blog">blog</Link>
          <Link to="/contact/" className="nav-item contact">contact</Link>
          <a href="https://photos.bjacobel.com" className="nav-item photos">photos</a>
        </div>
        <div className="socialbuttons">
          <a href="https://github.com/bjacobel" className="social-item github">
            <span className="sr">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/bjacobel" className="social-item linkedin">
            <span className="sr">LinkedIn</span>
          </a>
        </div>
      </div>
    );
  }
}
