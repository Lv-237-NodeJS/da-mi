import React from 'react';
import { Navigation, Dashboard } from 'src/components';
import { connect } from 'react-redux';

class Main extends React.Component {

  render() {
    const currentPath = window.location.pathname;

    return (
      <div>
        <Navigation />
        {this.props.isAuth && currentPath.match(/events/) &&
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
