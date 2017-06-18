import React from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../redux/Login';
import ProfileDropdown from '../ProfileDropDown/ProfileDropDown';

class Navigation extends React.Component {

  componentWillMount() {
    this.props.actions.checkToken();
  }
  
  render() {
    return (
      <div>
        <Navbar>
          <Nav bsStyle='pills' activeKey={1}>
            <LinkContainer to='/'>
              <NavItem eventKey={1}>Home</NavItem>
            </LinkContainer>
            <LinkContainer to='/about'>
              <NavItem eventKey={2}>About</NavItem>
            </LinkContainer>
            <LinkContainer to='/contacts'>
              <NavItem eventKey={3}>Contacts</NavItem>
            </LinkContainer>
            <LinkContainer to='/test'>
              <NavItem eventKey={4}>Test</NavItem>
            </LinkContainer>
          </Nav>
          {this.props.isAuth &&
            <Nav pullRight>
              <ProfileDropdown />
            </Nav>
          }
        </Navbar>
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

export default connect(mapStatetoProps, mapDispatchToProps)(Navigation);
