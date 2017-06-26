import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Profile extends React.Component {

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
  profile: state.profile.data,
  userId: state.login.userId
});

export default connect(mapStateToProps)(Profile);
