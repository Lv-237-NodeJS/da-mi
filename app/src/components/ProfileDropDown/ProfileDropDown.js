import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from 'src/redux/login';
import * as profileActions from 'src/redux/profileReducers';
import './profileDropDown.scss';

class ProfileDropDown extends React.Component {

  componentWillMount() {
    this.props.actions.profileActions.retrieveProfile(sessionStorage.getItem('userId'));
  }

  render() {
    const { profile, actions } = this.props;

    return(
      <div>
        <NavDropdown eventKey={5} id='basic-nav-dropdown'
          title={
            (profile.first_name && profile.last_name) ?
              `${profile.first_name} ${profile.last_name}` : profile.email
          }>
          <LinkContainer to='/profile'>
            <MenuItem eventKey={5.1}>Profile</MenuItem>
          </LinkContainer>
          <MenuItem eventKey={5.2} onClick={actions.loginActions.logout}>Log Out</MenuItem>
        </NavDropdown>
        <div className='avatar'></div>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  profile: state.profile.data
});

const mapDispatchToProps = dispatch => ({
  actions:{
    loginActions: bindActionCreators(loginActions, dispatch),
    profileActions: bindActionCreators(profileActions, dispatch)
  }
});

export default connect(mapStatetoProps, mapDispatchToProps)(ProfileDropDown);
