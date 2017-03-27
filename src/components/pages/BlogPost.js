import React, { Component } from 'react';
import { Link } from 'react-router';
import format from 'date-fns/format';
import hljs from 'highlight.js/lib/highlight';

import {
  DATE_FORMAT,
  LANGUAGES,
} from '../../constants';
import setTitle from '../../services/windowTitle';

LANGUAGES.forEach((langName) => {
  import(`highlight.js/lib/languages/${langName}`).then(langModule => hljs.registerLanguage(langName, langModule));
});

export default class BlogPost extends Component {
  componentWillMount() {
    const { y, m, d, slug } = this.props.params;

    import(`../../posts/${y}-${m}-${d}-${slug}.md`).then((post) => {
      this.setState({ post });
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
        <p className="date meta">{ format(post.meta.date, DATE_FORMAT) }</p>
        <p className="post-title">{ post.meta.title }</p>
        <div className="post-content" dangerouslySetInnerHTML={ { __html: post.html } } />
        <Link to="/blog/" className="text">⇽&nbsp;Back to posts</Link>
      </div>
    );
  }
}
