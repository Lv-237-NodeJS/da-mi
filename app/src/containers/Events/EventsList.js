import React from 'react';
import { Link } from 'react-router';
import { Table, Button } from 'react-bootstrap';

export default class EventsList extends React.Component {
  render() {
    return (
      <div>
        <h1>My Mock Events</h1>
        <Table>
            <thead>
             <tr>
               <th>Name</th>
               <th>Date</th>
               <th>Place</th>
               <th>Actions</th>
             </tr>
         </thead>
             <tbody>
      <tr>
        <td>Tom's Birhdat Party</td>
        <td>06/29/2017  6:30 pm</td>
        <td>Lviv, Street 1, 22/2</td>
        <td> <Button>Accept</Button>  <Button>Decline</Button></td>
      </tr>
      <tr>
        <td>Wedding 1</td>
        <td>06/29/2017  6:30 pm</td>
        <td>Lviv, Street 1, 22/2</td>
        <td> <Button>Edit</Button>  <Button>Delete</Button></td>
      </tr>
      <tr>
        <td>Wedding 1</td>
        <td>06/29/2017  6:30 pm</td>
        <td>Lviv, Street 1, 22/2</td>
        <td> <Button>Edit</Button>  <Button>Delete</Button></td>
      </tr>
  </tbody>
        </Table>
        {this.props.children}      
      </div>
    );
  }
}
