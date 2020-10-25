import React, { Component } from 'react';
import parse from 'date-fns/parse';

import { projects } from '../../services/requireAll';
import setTitle from '../../services/windowTitle';

export default class Projects extends Component {
  componentDidMount() {
    setTitle('Projects');
  }

  render() {
    return (
      <div>
        <p>
          This page describes some projects outside my professional life I've worked which were fun or I'm proud of.
        </p>

        <div className="list">
          { projects().sort((a, b) => parse(b.meta.date) - parse(a.meta.date)).map((project) => {
            const image = require(`../../images/${project.meta.image}`);  // eslint-disable-line global-require, import/no-dynamic-require, max-len
            return (
              <div className="list-item" key={ project.meta.title }>
                <div className="list-img" style={ { backgroundImage: `url('${image}')` } } />
                <div className="list-text">
                  <div dangerouslySetInnerHTML={ { __html: project.html } } />
                  <p>
                    { project.meta.site_title } <a href={ project.meta.site }>{ project.meta.site.split('//')[1] }</a>
                    &nbsp;•&nbsp;
                    Source: <a href={ project.meta.source }>{ project.meta.source.split('//')[1] }</a>
                  </p>
                </div>
              </div>
            );
          }) }
        </div>
      </div>
    );
  }
}
