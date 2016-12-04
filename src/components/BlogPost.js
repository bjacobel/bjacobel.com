import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import hljs from 'highlight.js';

export default class BlogPost extends Component {
  componentDidMount() {
    document.querySelectorAll('code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }

  render() {
    const { y, m, d, slug } = this.props.params;

    // @TODO: Use import() here once it lands in Webpack 2
    const post = require(`../posts/${y}-${m}-${d}-${slug}.md`);  // eslint-disable-line global-require, import/no-dynamic-require, max-len

    return (
      <div>
        <p className="date meta">{ moment(post.meta.date).format('MMMM Do, YYYY') }</p>
        <p className="post-title">{ post.meta.title }</p>
        <div className="post-content" dangerouslySetInnerHTML={ { __html: post.html } } />
        <Link to="/blog" className="text">⇽&nbsp;Back to posts</Link>
      </div>
    );
  }
}
