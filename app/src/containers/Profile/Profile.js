import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as profileActions from '../../redux/ProfileReducers';

class Profile extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
        firstName: null,
        lastName: null
      };
  }

  componentWillMount() {
    this.props.actions.retrieveProfile(this.state.profile);
    const data = this.props.profile;
    this.setState({
      firstName: data.profile.firstName,
      lastName: data.profle.lastName,
    });
    // let userId = sessionStorage.getItem('userId')
    // request
    //     .get(API.HOST + API.PORT + '/api/user/' + userId)
    //     .accept('json')
    //     .set('Content-Type', 'application/json')
    //     .then((response) => {
    //         this.setState({
    //             firstName: response.body.firstName,
    //             lastName: response.body.lastName,
    //           });
    //       });
  };

  render() {
    const profileNode = this.props.profile.profile.map((item) => {
      return (
        <div>
          <h1>Manage My Profile Data</h1>
            <p>First Name: {this.props.state.firstName}</p>
            <p>Last Name: {this.props.state.lastName}</p>
        </div>
      );
    });
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(profileActions, dispatch),
  };
};

export default connect(mapDispatchToProps, mapDispatchToProps)(Profile);
