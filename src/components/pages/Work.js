import React, { Component } from 'react';

import jobs from '../../data/work';
import setTitle from '../../services/windowTitle';

export default class Work extends Component {
  componentDidMount() {
    setTitle('Work');
  }

  render() {
    return (
      <div>
        <p>
          <span>This page describes my recent work experiences. </span>
          <span>You can also view my formal resume <a href="https://files.bjacobel.com/resume.pdf">here.</a></span>
        </p>

        <div className="list">
          { jobs.map((job) => {
            const image = require(`../../images/${job.meta.image}`);  // eslint-disable-line global-require, import/no-dynamic-require, max-len
            return (
              <div className="list-item" key={ job.meta.title }>
                <div className="list-img" style={ { backgroundImage: `url('${image}')` } } />
                <div className="list-text">
                  <div dangerouslySetInnerHTML={ { __html: job.html } } />
                  <p>{ job.meta.time_start } &nbsp;•&nbsp; { job.meta.time_stop }</p>
                </div>
              </div>
            );
          }) }
        </div>
      </div>
    );
  }
}
