import React, { Component } from 'react';
import classNames from 'classnames';
import ReactGA from 'react-ga';
import { Redirect, Switch } from 'react-router';

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
import NotFound from './framework/NotFound';

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
            <Switch>
              <GARoute ssrPathContext={ path } path="/activity/" component={ Activity } />
              <GARoute ssrPathContext={ path } path="/blog/" component={ BlogIndex } />
              <GARoute ssrPathContext={ path } path="/contact/" component={ Contact } />
              <GARoute ssrPathContext={ path } path="/projects/" component={ Projects } />
              <GARoute ssrPathContext={ path } path="/work/" component={ Work } />
              <GARoute ssrPathContext={ path } path="/" exact component={ About } />
              <GARoute ssrPathContext={ path } path="/:y/:m/:d/:slug/" component={ BlogPost } />
              <GARoute ssrPathContext={ path } path="/pgp/" render={ () => <Redirect to="/contact/#pgp" /> } />
              <GARoute ssrPathContext={ path } component={ NotFound } />
            </Switch>
          </div>
        </div>
      </UniversalRouter>
    );
  }
}
