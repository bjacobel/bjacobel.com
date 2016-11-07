import React, { Component } from 'react';
import { Link } from 'react-router';

export default class BlogIndex extends Component {
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
