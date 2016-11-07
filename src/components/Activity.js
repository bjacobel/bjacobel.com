import React, { Component } from 'react';
import moment from 'moment';

const mkcommits = (timestamp, num, ref, reponame, commits) => {
  const commitS = (num === 1 ? '' : 's');
  const repolink = <a href={ `https://github.com/${reponame}` }>{ reponame }</a>;
  const branchlink = <a href={ `https://github.com/${reponame}/tree/${ref}` }>{ ref }</a>;
  const mtimestamp = <p className="timestamp">{ moment(timestamp).fromNow() }</p>;

  return (
    <div key={ timestamp }>
      { mtimestamp }
      <p>Pushed {num} commit{ commitS } to { branchlink } at { repolink }</p>
      { commits.map((element) => {
        return (
          <p className="code" key={ element.sha }>
            <a href={ `https://github.com/${reponame}/commit/${element.sha}` }>{ element.sha.slice(0, 8) }</a>:
            { element.message }
          </p>
        );
      }) }
    </div>
  );
};

export default class Activity extends Component {
  componentWillMount() {
    this.setState({ commitHtml: null });

    fetch('https://api.github.com/users/bjacobel/events/public')
      .then(data => data.json())
      .then((json) => {
        return json.filter(element => element.type === 'PushEvent').map((element) => {
          return mkcommits(
            element.created_at,
            element.payload.commits.length,
            element.payload.ref.slice(11),
            element.repo.name,
            element.payload.commits,
          );
        });
      })
      .then((commitHtml) => {
        this.setState({ commitHtml });
      });
  }

  render() {
    return (
      <div className="activity">
        <p className="post-title">Here's what I'm working on, right now:</p>
        <div className="events">{ this.state.commitHtml }</div>
        <p><i>(data via the <a href="https://developer.github.com/v3/activity/events/">github public api</a>)</i></p>
      </div>
    );
  }
}


