import React from 'react';
import request from 'superagent';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { API } from './../../helper/constants';


export default class ProfileSubNav extends React.Component {
    
    constructor() {
        super();
        this.state = {
            firstName: 'no name',
            lastName: 'no name'
        };
    }

     componentWillMount(){
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

render() {
    return (
    <div>
        <NavDropdown eventKey={4} title = {this.state.firstName + " " + this.state.lastName} id="basic-nav-dropdown">
            <LinkContainer to='/profile'>
                <MenuItem eventKey={4.1}>Edit Profile</MenuItem>
            </LinkContainer>
                <MenuItem eventKey={4.2} onClick={this.logout}>Log Out</MenuItem>
        </NavDropdown>
            {/*</div>
            <div>
            <Image src="./../../../img/no-image-icon.png" rounded/>
            </div>*/}
    </div>
    );
  }
}
