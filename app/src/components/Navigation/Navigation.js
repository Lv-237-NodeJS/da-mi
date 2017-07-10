import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from 'src/redux/login';
import { ProfileDropDown } from 'src/components';
import './Navigation.scss';

class Navigation extends React.Component {
  componentWillMount = () => {
    this.props.actions.checkToken();
  }

  constructor(props) {
    super(props);
    this.state = {
      activeKey: 1
    };
  }

  handleSelect = selectedKey => {
    this.setState({activeKey: selectedKey});
  };
  
  render() {

    return (
      <div>
        <Navbar>
          <Nav className='test' activeKey={this.state.activeKey} onSelect={this.handleSelect}>
            <IndexLinkContainer to={this.props.isAuth && '/events' || '/'}>
              <NavItem eventKey={1}>Home</NavItem>
            </IndexLinkContainer>
            <IndexLinkContainer to='/about'>
              <NavItem eventKey={2}>About</NavItem>
            </IndexLinkContainer>
            <IndexLinkContainer to='/contacts'>
              <NavItem eventKey={3}>Contacts</NavItem>
            </IndexLinkContainer>
          </Nav>
          {this.props.isAuth &&
            <Nav className='pull-right'>
              <ProfileDropDown />
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
