import React from 'react';
import { connect } from 'react-redux';

class Profile extends React.Component {

  render() {
    const { profile } = this.props;
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
  profile: state.profile.data
});

export default connect(mapStateToProps)(Profile);
