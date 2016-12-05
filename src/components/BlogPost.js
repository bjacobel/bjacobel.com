import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import hljs from 'highlight.js';

import { DATE_FORMAT } from '../constants';
import setTitle from '../services/windowTitle';

export default class BlogPost extends Component {
  componentWillMount() {
    const { y, m, d, slug } = this.props.params;

    // @TODO: Use import() here once it lands in Webpack 2
    this.setState({
      post: require(`../posts/${y}-${m}-${d}-${slug}.md`),  // eslint-disable-line global-require, import/no-dynamic-require, max-len
    });
  }

  componentDidMount() {
    setTitle(this.state.post.meta.title);

    document.querySelectorAll('code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }

  render() {
    const { post } = this.state;

    return (
      <div>
        <p className="date meta">{ moment(post.meta.date).format(DATE_FORMAT) }</p>
        <p className="post-title">{ post.meta.title }</p>
        <div className="post-content" dangerouslySetInnerHTML={ { __html: post.html } } />
        <Link to="/blog" className="text">⇽&nbsp;Back to posts</Link>
      </div>
    );
  }
}
