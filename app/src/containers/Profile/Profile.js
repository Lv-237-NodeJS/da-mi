import React from 'react';
import request from 'superagent';
import { API } from './../../helper/constants';

export default class Profile extends React.Component {

  constructor() {
    super();
    this.state = {
        firstName: null,
        lastName: null
      };
  }

  componentWillMount() {
    let userId = sessionStorage.getItem('userId')
    request
        .get(API.HOST + API.PORT + '/api/user/' + userId)
        .accept('json')
        .set('Content-Type', 'application/json')
        .then((response) => {
            this.setState({
                firstName: response.body.firstName,
                lastName: response.body.lastName,
              });
          });
  };

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
