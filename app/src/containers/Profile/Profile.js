import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as profileActions from '../../redux/ProfileReducers';

class Profile extends React.Component {

  componentWillMount() {
    this.props.actions.retrieveProfile(this.props.userId);
    this.setState({profile: this.props.profile});
  }

  render() {
    const profile = this.props.profile;
    return (
      <div>
        <h1>My Profile Info</h1>
        <p>First Name: {profile.firstName}</p>
        <p>Last Name: {profile.lastName}</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile.profile,
  userId: state.login.userId
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(profileActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
