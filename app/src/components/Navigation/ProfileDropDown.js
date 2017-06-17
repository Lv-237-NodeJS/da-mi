
import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../redux/Login';
import * as profileActions from '../../redux/ProfileReducers';

class ProfileDropDown extends React.Component {

  componenWillMount() {
    this.props.actions.checkToken();
    this.props.actions.retrieveProfile(this.props.userId);
    this.setState({profile: this.props.profile});
  }

  render() {
    return (
      <div >
        <NavDropdown style={{display: 'inline-block'}} eventKey={5} id='basic-nav-dropdown' title={this.props.profile.firstName + ' ' + this.props.profile.lastName}>
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
  isAuth: state.login.isAuth,
  profile: state.profile.profile
});

const mapDispatchToProps = dispatch => ({
  actions:{
    loginActions: bindActionCreators(loginActions, dispatch),
    profileActions: bindActionCreators(profileActions, dispatch)
  }
});

export default connect(mapStatetoProps, mapDispatchToProps)(ProfileDropDown);
