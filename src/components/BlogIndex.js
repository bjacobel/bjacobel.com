import React, { Component } from 'react';

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
                <a href={ post.url }>{ post.title }</a>
              </p>
              <p>{ post.excerpt }</p>
            </li>
          );
        }) }
      </ul>
    );
  }
}
