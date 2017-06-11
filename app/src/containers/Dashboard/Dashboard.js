import React from 'react';
import { Table, Button } from 'react-bootstrap';

export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>My Dashboard</h1>
        <Table bordered>
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
                    <td>Tom's Birthday Party</td>
                    <td>07/20/2017  19:00</td>
                    <td>Lviv, Street 1, palce 1</td>
                    <td>
                        <Button>Accept</Button>
                        <Button>Dismiss</Button>
                    </td>
                </tr>
                <tr>
                    <td>fgfdgfggff</td>
                    <td>gfdgdfgdfg</td>
                    <td>gdfgfdgfgd</td>
                    <td>
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                    </td>
                </tr>
            </tbody>
        </Table>
      </div>
    );
  }
}
