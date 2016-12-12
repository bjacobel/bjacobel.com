import React, { Component } from 'react';
import classNames from 'classnames';
import ReactGA from 'react-ga';

import { GA_ID } from '../constants';

import Header from './Header';
import Sidebar from './Sidebar';

import AnalyticsMatch from './framework/AnalyticsMatch';
import UniversalRouter from './framework/UniversalRouter';

import About from './pages/About';
import Activity from './pages/Activity';
import PGP from './pages/PGP';
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
            <AnalyticsMatch path={ path } pattern="/activity/" component={ Activity } />
            <AnalyticsMatch path={ path } pattern="/blog/" component={ BlogIndex } />
            <AnalyticsMatch path={ path } pattern="/pgp/" component={ PGP } />
            <AnalyticsMatch path={ path } pattern="/projects/" component={ Projects } />
            <AnalyticsMatch path={ path } pattern="/work/" component={ Work } />
            <AnalyticsMatch path={ path } pattern="/" exactly component={ About } />
            <AnalyticsMatch path={ path } pattern="/:y/:m/:d/:slug/" component={ BlogPost } />
          </div>
        </div>
      </UniversalRouter>
    );
  }
}
