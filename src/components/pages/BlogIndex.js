import React, { Component } from 'react';
import { Link } from 'wouter';
import parse from 'date-fns/parse';
import format from 'date-fns/format';

import setTitle from '../../services/windowTitle';
import { posts } from '../../services/requireAll';
import { DATE_FORMAT } from '../../constants';

export default class BlogIndex extends Component {
  componentDidMount() {
    setTitle('Blog');
  }

  render() {
    return (
      <ul className="posts">
        { posts()
            .filter(x => !x.meta.draft)
            .sort((a, b) => parse(b.meta.date) - parse(a.meta.date))
            .map((post) => {
              return (
                <li key={ post.url }>
                  <span>{ format(post.meta.date, DATE_FORMAT) }</span>
                  <p className="posttitle">
                    <Link to={ post.url }>{ post.meta.title }</Link>
                  </p>
                  <p dangerouslySetInnerHTML={ { __html: `${post.html.split('</p>')[0]}</p>` } } />
                </li>
              );
            })
         }
      </ul>
    );
  }
}
