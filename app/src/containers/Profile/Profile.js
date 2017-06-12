import React from 'react';
import request from 'superagent';
import { API } from './../../helper/constants';

export default class Profile extends React.Component {

    constructor() {
        super();
        this.state = {
                firstName: 'no name',
                lastName: 'no name'
            };
        }

    componentWillMount(){
      // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNDk3MDEyNzY0LCJleHAiOjE0OTcwMTk5NjR9.AUGKxZV17jGr3PTBPK-WRpcIgwWVyxFPcreekWwN4s8';
      // let token = sessionStorage.getItem('token')
      request
        .get(API.HOST + API.PORT + '/api/user/1')
        .accept('json')
        // .set('x-access-token', token)
        .set('Content-Type', 'application/json')
        .then((response) => {
          this.setState({
            firstName: response.body.firstName,
            lastName: response.body.lastName,
           })
          });
        };

 
    //     request.get('localhost:8082/api/users/:id')
    //     .set('x-access-token', token)
    // }

  render() {
    return (
      <div>
        <h1>Manage My Profile Data</h1>
        <p>First Name: {this.state.firstName}</p>
        <p>Last Name: {this.state.lastName}</p>
    </div>
  );
  }
}
