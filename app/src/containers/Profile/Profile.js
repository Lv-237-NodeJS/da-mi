import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as profileActions from '../../redux/ProfileReducers';

class Profile extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      profile: {},
    };
  }

  componentWillMount() {
    this.props.actions.retrieveProfile(this.props.userId);
    this.setState({profile: this.props.profile});
  }

  render() {

    return (
      <div>
        <h1>Manage My Profile Data</h1>
        <p>First Name: {this.props.profile.firstName}</p>
        <p>Last Name: {this.props.profile.lastName}</p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.profile.profile,
    userId: state.login.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(profileActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
