import React from 'react';
import { Navigation } from '../';

export default class Main extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        {this.props.children}
      </div>
    );
  }
}
