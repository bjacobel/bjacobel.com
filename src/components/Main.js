import React, { Component } from 'react';
import classNames from 'classnames';
import ReactGA from 'react-ga';
import { Redirect } from 'react-router';

import { GA_ID } from '../constants';

import Header from './Header';
import Sidebar from './Sidebar';

import GARoute from './framework/GARoute';
import UniversalRouter from './framework/UniversalRouter';

import About from './pages/About';
import Activity from './pages/Activity';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Work from './pages/Work';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';

const MenuButton = ({ toggleMenu, active }) => {
  return (
    <button className="mobile-burger" onClick={ toggleMenu }>
      <span className={ classNames('burger-lines', { active }) } />
    </button>
  );
};

export default class Main extends Component {
  componentWillMount() {
    if (typeof window !== 'undefined') {
      ReactGA.initialize(GA_ID);
    }

    this.setState({ menuActive: false });
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ menuActive: !this.state.menuActive });
  }

  render() {
    const { menuActive } = this.state;
    const { path } = this.props;

    return (
      <UniversalRouter path={ path }>
        <div className={ classNames('app', { menuActive }) }>
          <Header />
          <Sidebar />
          <MenuButton toggleMenu={ this.toggleMenu } active={ menuActive } />
          <div className="body-content">
            <GARoute path={ path } pattern="/activity/" component={ Activity } />
            <GARoute path={ path } pattern="/blog/" component={ BlogIndex } />
            <GARoute path={ path } pattern="/contact/" component={ Contact } />
            <GARoute path={ path } pattern="/projects/" component={ Projects } />
            <GARoute path={ path } pattern="/work/" component={ Work } />
            <GARoute path={ path } pattern="/" exact component={ About } />
            <GARoute path={ path } pattern="/:y/:m/:d/:slug/" component={ BlogPost } />
            <GARoute path={ path } pattern="/pgp/" render={ () => <Redirect to="/contact/#pgp" /> } />
          </div>
        </div>
      </UniversalRouter>
    );
  }
}
