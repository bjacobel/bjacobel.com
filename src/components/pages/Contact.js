import React, { Component } from 'react';
import pgp from '../../data/pgp.md';

import setTitle from '../../services/windowTitle';

const Email = ({ user, domain }) => <span className="email" data-user={ user } data-domain={ domain } />;

export default class Contact extends Component {
  componentDidMount() {
    setTitle('Contact');
  }

  render() {
    return (
      <div>
        <h2 id="signal"><a href="https://whispersystems.org/">Signal</a></h2>
        <p>Message me using another contact method first to ask for my Signal number.</p>

        <h2 id="keybase"><a href="https://keybase.io/blog/keybase-chat">Keybase Chat</a></h2>
        <p>I'm <a href="https://keybase.io/bjacobel/chat">bjacobel</a> on Keybase.</p>

        <h2 id="pgp">Email</h2>
        <p>My PGP key is linked to the following addresses.</p>
        <ul>
          <li><Email user="bjacobel" domain="gmail.com" /> (personal)</li>
          <li><Email user="brian" domain="bjacobel.com" /> (work inquiries)</li>
        </ul>
        <div className="pgp" dangerouslySetInnerHTML={ { __html: pgp.html } } />
      </div>
    );
  }
}

