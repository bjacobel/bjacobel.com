import React, { Component } from 'react';
import { Link } from 'react-router';

import setTitle from '../services/windowTitle';

export default class BlogIndex extends Component {
  componentDidMount() {
    setTitle('Blog');
  }

  render() {
    const posts = [];

    return (
      <ul className="posts">
        { posts.map((post) => {
          return (
            <li>
              <span>{ post.date }</span>
              <p className="posttitle">
                <Link to={ post.url }>{ post.title }</Link>
              </p>
              <p>{ post.excerpt }</p>
            </li>
          );
        }) }
      </ul>
    );
  }
}
