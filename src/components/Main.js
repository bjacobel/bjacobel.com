import React, { Component } from 'react';
import { Miss } from 'react-router';
import classNames from 'classnames';
import ReactGA from 'react-ga';

import Header from './Header';
import Sidebar from './Sidebar';
import About from './About';
import Activity from './Activity';
import PGP from './PGP';
import Projects from './Projects';
import Work from './Work';
import BlogIndex from './BlogIndex';
import BlogPost from './BlogPost';
import AnalyticsMatch from './AnalyticsMatch';
import UniversalRouter from './UniversalRouter';
import {
  GA_ID,
  TRACK_ANALYTICS,
} from '../constants';

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
