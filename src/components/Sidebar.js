import React, { Component } from 'react';
import classNames from 'classnames';

export default class Sidebar extends Component {
  componentWillMount() {
    this.burgerActive = false;
  }

  toggleBurger() {
    this.burgerActive = !this.burgerActive;
  }

  render() {
    return (
      <div>
        { /* <div className="mobile-burger" onClick={ () => this.toggleBurger() }>
          <span className={ classNames('burger-lines', { active: this.burgerActive }) } />
        </div> */ }
        <div className="sidebar">
          <div className="headshot" />
          <div className="container">
            <a href="/" className="nav-item about">about</a>
            <a href="/projects" className="nav-item projects">projects</a>
            <a href="/activity" className="nav-item activity">activity</a>
            <a href="/work" className="nav-item work">work</a>
            <a href="/resume" className="nav-item resume">resume</a>
            <a href="/blog" className="nav-item blog">blog</a>
            <a href="https://photos.bjacobel.com" className="nav-item photos">photos</a>
          </div>
          <div className="socialbuttons">
            <a href="https://github.com/bjacobel" className="social-item github">
              <span className="sr">GitHub</span>
            </a>
            <a href="https://twitter.com/bjacobel" className="social-item twitter">
              <span className="sr">Twitter</span>
            </a>
            <a href="https://www.linkedin.com/in/bjacobel" className="social-item linkedin">
              <span className="sr">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

// document.querySelector('.mobile-burger').on('click', () => {
//     $(".main").toggleclass("slide-visible");
//     $(".burger-lines").toggleclass("active");
// });

