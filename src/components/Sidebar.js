import React, { Component } from 'react';
import { Link } from 'react-router';
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
      <div className="sidebar">
        { /* <div className="mobile-burger" onClick={ () => this.toggleBurger() }>
          <span className={ classNames('burger-lines', { active: this.burgerActive }) } />
        </div> */ }
        <div className="headshot" />
        <div className="container">
          <Link to="/" className="nav-item about">about</Link>
          <Link to="/projects" className="nav-item projects">projects</Link>
          <Link to="/activity" className="nav-item activity">activity</Link>
          <Link to="/work" className="nav-item work">work</Link>
          <Link to="/blog" className="nav-item blog">blog</Link>
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
    );
  }
}

// document.querySelector('.mobile-burger').on('click', () => {
//     $(".main").toggleclass("slide-visible");
//     $(".burger-lines").toggleclass("active");
// });

