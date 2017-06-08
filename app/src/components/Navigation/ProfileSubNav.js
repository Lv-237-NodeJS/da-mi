import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class ProfileSubNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getProfile: {
                first_name: '',
                last_name: ''
            }
        }
        this.getProfile = this.getProfile.bind(this);
    }
    getProfile() {
        request.get('localhost:8082/api/user/')
        .query({id: 1})
        .end((err,res) => {

        });
    }

  render() {
    return (
      <div>
          {/*<div>*/}
           <NavDropdown eventKey={4} title = "{this.props.first_name}{this.props.last_name}" id="basic-nav-dropdown">
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
