import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as profileActions from '../../redux/ProfileReducers';

class Profile extends React.Component {

  constructor(props, context) {
    console.log('constructor');
    super(props, context);

    this.state = {
      profile: {},
    };
  };

  componentWillMount() {
    this.props.actions.retrieveProfile();
    this.setState({profile: this.props.profile});
    console.log('wil mount', this.state.profile);
  };

  render() {

    return (
      <div>
        <h1>Manage My Profile Data</h1>
          <p>First Name: {this.props.profile.firstName}</p>
          <p>Last Name: {this.props.profile.lastName}</p>
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  console.log('state', state);
  return {
    profile: state.profile.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(profileActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
