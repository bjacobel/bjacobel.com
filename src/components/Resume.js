import React, { Component } from 'react';

export default class Work extends Component {
  componentWillMount() {
    this.width = document.querySelector('.body-content').offsetWidth;
    this.height = this.width * (11 / 8.5);
  }

  render() {
    return <object height={ this.height } width={ this.width } data="https://files.bjacobel.com/resume.pdf" />;
  }
}
