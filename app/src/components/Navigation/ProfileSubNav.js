import React from 'react';
import request from 'superagent';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { API } from './../../helper/constants';


export default class ProfileSubNav extends React.Component {
  constructor() {
    super();
    this.state = {
        firstName: '',
        lastName: '',
      };
  }

  componentWillMount() {
    // let token = sessionStorage.getItem('token')
    request
      .get(API.HOST + API.PORT + '/api/user/1')
      .accept('json')
    //   .set('x-access-token', token)
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
      <div >
          <NavDropdown eventKey={5} title = {this.state.firstName + ' ' + this.state.lastName} id='basic-nav-dropdown'>
             <LinkContainer to='/profile'>
                <MenuItem eventKey={5.1}>Edit Profile</MenuItem>
             </LinkContainer>
                <MenuItem eventKey={5.2} onClick={this.logout}>Log Out</MenuItem>
         </NavDropdown>
     </div>
    );
  }
}
