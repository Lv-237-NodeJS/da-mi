import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as loginActions from '../../redux/Login';

import ProfileSubNav from './ProfileSubNav';
import ProfileAvatar from './ProfileAvatar';

export default class Navigation extends React.Component {

  // componentWillMount() {
  //   this.props.actions.checkToken();
  // }

  render() {
    return (
      <div>
          <Navbar>
          <Nav bsStyle='pills' activeKey={4}>
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
            <LinkContainer to='/dashboard'>
              <NavItem eventKey={5}>Dashboard</NavItem>
            </LinkContainer>
          </Nav>
          {/*{this.props.isToken &&*/}
          <Nav pullRight>
              <ProfileSubNav />
          </Nav>
          {/*}*/}
          <div className='pull-right'>
          < ProfileAvatar />
          </div>
        </Navbar>
      </div>
    );
  }
}

// const mapStateProps = state => ({
//   isToken: state.login.isToken
// });

// export default connect(mapStateProps, mapDispatchToProps)(Navigation);
