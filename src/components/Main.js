import React, { Component } from 'react';
import { Miss } from 'react-router';
import classNames from 'classnames';
import ReactGA from 'react-ga';

import {
  GA_ID,
  TRACK_ANALYTICS,
} from '../constants';

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
    if (TRACK_ANALYTICS) {
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

    return (
      <UniversalRouter>
        <div className={ classNames('app', { menuActive }) }>
          <Header />
          <Sidebar />
          <MenuButton toggleMenu={ this.toggleMenu } active={ menuActive } />
          <div className="body-content">
            <AnalyticsMatch pattern="/activity" component={ Activity } />
            <AnalyticsMatch pattern="/blog" component={ BlogIndex } />
            <AnalyticsMatch pattern="/pgp" component={ PGP } />
            <AnalyticsMatch pattern="/projects" component={ Projects } />
            <AnalyticsMatch pattern="/work" component={ Work } />
            <AnalyticsMatch pattern="/" exactly component={ About } />
            <AnalyticsMatch pattern="/:y/:m/:d/:slug" component={ BlogPost } />
            <Miss
              render={ () => (
                <p>Not found.</p>
              ) }
            />
          </div>
        </div>
      </UniversalRouter>
    );
  }
}
