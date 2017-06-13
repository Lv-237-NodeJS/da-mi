import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../redux/Login';

class ProfileDropDown extends React.Component {
//   constructor(porps) {
//     super(props);
//     this.state = {
//         firstName: null,
//         lastName: null,
//       };
//   }

  componenWillMount() {
    this.props.actions.checkToken();
  };

  render() {
    return (
      <div >
          <NavDropdown style={{display: 'inline-block'}} eventKey={5} id='basic-nav-dropdown' title='First Name Last Name'>
             <LinkContainer to='/profile'>
                <MenuItem eventKey={5.1}>Edit Profile</MenuItem>
             </LinkContainer>
                <MenuItem eventKey={5.2} onClick={this.props.actions.logout}>Log Out</MenuItem>
         </NavDropdown>
         <span> 
              <Image src='http://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png'circle width='45'/>
        </span>
     </div>
    );
  }
}

const mapStatetoProps = state => ({
  isAuth: state.login.isAuth
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(loginActions, dispatch)
});

export default connect(mapStatetoProps, mapDispatchToProps)(ProfileDropDown);
