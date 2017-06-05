import React from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class Navigation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    }
  }
  
  componentWillMount () {
    sessionStorage.getItem('token')?
      this.setState({loggedIn: true}): this.setState({loggedIn: false})
  }

  logout = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/';
  }
  
  render() {
    return (
      <div>
        <Navbar>
          <Nav bsStyle="pills" activeKey={1}>
            <LinkContainer to='/'>
              <NavItem eventKey={1}>Home</NavItem>
            </LinkContainer>
            <LinkContainer to='/about'>
              <NavItem eventKey={2}>About</NavItem>
            </LinkContainer>
            <LinkContainer to='/contacts'>
              <NavItem eventKey={3}>Contacts</NavItem>
            </LinkContainer>
          </Nav>
          {this.state.loggedIn &&
            <Button className="pull-right" type="button" onClick={this.logout}>Log out</Button>
          }
        </Navbar>
      </div>
    );
  }
}
