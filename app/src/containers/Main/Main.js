import React from 'react';
import { Navigation, Dashboard } from './../../components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../redux/Login';

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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(loginActions, dispatch)
});

export default connect(mapStatetoProps, mapDispatchToProps)(Main);
