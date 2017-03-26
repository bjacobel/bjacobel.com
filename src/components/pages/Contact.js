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
        <h2 id="twitter"><a href="https://twitter.com/bjacobel">Twitter</a></h2>
        <p>My DMs are closed by default. Ask me to follow you first so we can DM.</p>
        <p>Please note Twitter DMs don't implement any kind of E2E encryption.</p>

        <h2 id="signal"><a href="https://whispersystems.org/">Signal</a></h2>
        <p>Message me using another contact method first to ask for my Signal number.</p>

        <h2 id="keybase"><a href="https://keybase.io/blog/keybase-chat">Keybase Chat</a></h2>
        <p>I'm <a href="https://keybase.io/bjacobel">bjacobel</a> on Keybase.</p>

        <h2 id="pgp">Email</h2>
        <p>You can also use Keybase or my key below to send me email at the appropriate address.</p>
        <ul>
          <li><Email user="bjacobel" domain="gmail.com" /> (personal)</li>
          <li><Email user="brian" domain="bjacobel.com" /> (work inquiries)</li>
          <li><Email user="bjacobel" domain="edx.org" /> (current employer)</li>
        </ul>
        <p>Don't email me if you're a staffing agency, I only work with internal recruiters.</p>
        <div className="pgp" dangerouslySetInnerHTML={ { __html: pgp.html } } />
      </div>
    );
  }
}

