import React, { Component } from 'react';
import { Match, Miss, BrowserRouter } from 'react-router';

import Header from './Header';
import Sidebar from './Sidebar';
import About from './About';
import Activity from './Activity';
import PGP from './PGP';
import Projects from './Projects';
import Resume from './Resume';
import Work from './Work';
import BlogIndex from './BlogIndex';
import BlogPost from './BlogPost';

export default class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="body-content">
          <Header />
          <Sidebar />
          <Match pattern="/activity" component={ Activity } />
          <Match pattern="/blog" component={ BlogIndex } />
          <Match pattern="/pgp" component={ PGP } />
          <Match pattern="/projects" component={ Projects } />
          <Match pattern="/resume" component={ Resume } />
          <Match pattern="/work" component={ Work } />
          <Match pattern="/" component={ About } />
          <Match pattern="/:y/:m/:d/:slug" component={ BlogPost } />
          <Miss
            render={ () => (
              <p>Not found.</p>
            ) }
          />
        </div>
      </BrowserRouter>
    );
  }
}
