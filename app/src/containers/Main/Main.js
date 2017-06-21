import React from 'react';
import { Navigation, Dashboard } from './../../components';
import { connect } from 'react-redux';

class Main extends React.Component {

  render() {
    return (
      <div>
        <Navigation />
        {this.props.isAuth &&
          <Dashboard />
        }
        {this.props.children}
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  isAuth: state.login.isAuth
});

export default connect(mapStatetoProps)(Main);
