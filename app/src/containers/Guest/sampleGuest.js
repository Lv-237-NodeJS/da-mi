import React from 'react';
import { PageHeader, } from 'react-bootstrap';
import { Link } from 'react-router';

export default class Guest extends React.Component {
  render () {
    return (
      <div>
        <PageHeader className="text-center">Here will be List of Guests</PageHeader>
          <div className="list-group">
            <Link className="list-group-item">Guest 1</Link>
            <Link className="list-group-item">Guest 1</Link>
          </div>  
      </div>
    );
  }
}
