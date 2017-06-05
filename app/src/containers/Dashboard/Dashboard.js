import React from 'react';
import { Link } from 'react-router';
import { Form, FormGroup, ControlLabel, FormControl, Col, Button, Table , Panel } from 'react-bootstrap';

export default class Dashboard extends React.Component {  
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <Table>
            <thead>
             <tr>
               <th>#</th>
               <th>First Name</th>
               <th>Last Name</th>
               <th>Username</th>
             </tr>
         </thead>
             <tbody>
      <tr>
        <td>1</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <td>3</td>
        <td colSpan="2">Larry the Bird</td>
        <td>@twitter</td>
      </tr>
  </tbody>
        </Table>
        {this.props.children}      
      </div>
    );
  }
}
