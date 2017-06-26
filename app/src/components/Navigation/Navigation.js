import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../redux/login';
import { ProfileDropDown } from './../';
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
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect = selectedKey => {
    this.setState({activeKey: selectedKey});
  }
  
  render() {
    return (
      <div>
        <Navbar>
          <Nav activeKey={this.state.activeKey} onSelect={this.handleSelect}>
            <LinkContainer to='/events'>
              <NavItem eventKey={1}>Home</NavItem>
            </LinkContainer>
            <LinkContainer to='/about'>
              <NavItem eventKey={2}>About</NavItem>
            </LinkContainer>
            <LinkContainer to='/contacts'>
              <NavItem eventKey={3}>Contacts</NavItem>
            </LinkContainer>
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
