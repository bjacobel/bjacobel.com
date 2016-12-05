import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

import setTitle from '../services/windowTitle';
import { DATE_FORMAT } from '../constants';

const requireAll = (requireContext) => {
  return requireContext.keys().map(requireContext);
};

export default class BlogIndex extends Component {
  componentDidMount() {
    setTitle('Blog');
  }

  render() {
    const posts = requireAll(require.context('../posts/', true, /\.md$/));

    return (
      <ul className="posts">
        { posts.sort((a, b) => moment(b.meta.data) - moment(a.meta.date)).map((post) => {
          return (
            <li key={ post.meta.url }>
              <span>{ moment(post.meta.date).format(DATE_FORMAT) }</span>
              <p className="posttitle">
                <Link to={ post.meta.url }>{ post.meta.title }</Link>
              </p>
              <p dangerouslySetInnerHTML={ { __html: `${post.html.split('</p>')[0]}</p>` } } />
            </li>
          );
        }) }
      </ul>
    );
  }
}
