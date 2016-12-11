import React, { Component } from 'react';
import pgp from '../../data/pgp.md';

import setTitle from '../../services/windowTitle';

export default class PGP extends Component {
  componentDidMount() {
    setTitle('PGP');
  }

  render() {
    return (
      <div>
        <p>PGP public key for emails:</p>
        <ul>
          <li><a href="mailto:bjacobel@gmail.com">bjacobel@gmail.com</a> (personal)</li>
          <li><a href="mailto:brian@bjacobel.com">brian@bjacobel.com</a> (professional)</li>
          <li><a href="mailto:bjacobel@edx.org">bjacobel@edx.org</a> (work)</li>
        </ul>
        <p>Also see my <a href="https://keybase.io/bjacobel">keybase.io</a> page.</p>

        <div className="pgp" dangerouslySetInnerHTML={ { __html: pgp.html } } />
      </div>
    );
  }
}

