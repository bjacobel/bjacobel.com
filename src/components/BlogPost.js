import React, { Component } from 'react';
import { Link } from 'react-router';

export default class BlogPost extends Component {
  render() {
    const { post } = this.props;

    return (
      <div>
        <p className="date meta">{ post.date }</p>
        <p className="post-title">{ post.title }</p>
        <div className="post-content">
          { post.content }
        </div>
        <Link to="/blog" className="text">⇽&nbsp;Back to posts</Link>
      </div>
    );
  }
}
