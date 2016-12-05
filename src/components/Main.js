import React, { Component } from 'react';
import { Match, Miss, BrowserRouter } from 'react-router';
import classNames from 'classnames';

import Header from './Header';
import Sidebar from './Sidebar';
import About from './About';
import Activity from './Activity';
import PGP from './PGP';
import Projects from './Projects';
import Work from './Work';
import BlogIndex from './BlogIndex';
import BlogPost from './BlogPost';

const MenuButton = ({ toggleMenu, active }) => {
  return (
    <div className="mobile-burger" onClick={ toggleMenu }>
      <span className={ classNames('burger-lines', { active }) } />
    </div>
  );
};

export default class Main extends Component {
  componentWillMount() {
    this.setState({ menuActive: false });
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ menuActive: !this.state.menuActive });
  }

  render() {
    const { menuActive } = this.state;

    return (
      <BrowserRouter>
        <div className={ classNames('app', { menuActive }) }>
          <Header />
          <Sidebar />
          <MenuButton toggleMenu={ this.toggleMenu } active={ menuActive } />
          <div className="body-content">
            <Match pattern="/activity" component={ Activity } />
            <Match pattern="/blog" component={ BlogIndex } />
            <Match pattern="/pgp" component={ PGP } />
            <Match pattern="/projects" component={ Projects } />
            <Match pattern="/work" component={ Work } />
            <Match pattern="/" exactly component={ About } />
            <Match pattern="/:y/:m/:d/:slug" component={ BlogPost } />
            <Miss
              render={ () => (
                <p>Not found.</p>
              ) }
            />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
