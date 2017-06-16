import React from 'react';
import { PageHeader } from 'react-bootstrap';
import { Link } from 'react-router';

export default class Gift extends React.Component {
  render () {
    return (
      <div>
        <PageHeader className="text-center">Here will be List of Gifts</PageHeader>
        <div className="list-group">
          <Link className="list-group-item">Gift 1</Link>
          <Link className="list-group-item">Gift 2</Link>
        </div>
      </div>
    );
  }
}
