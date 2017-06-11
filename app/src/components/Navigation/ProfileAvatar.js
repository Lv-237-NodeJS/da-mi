import React from 'react';
import request from 'superagent';
import { Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { API } from './../../helper/constants';


export default class ProfileAvatar extends React.Component {
  constructor() {
    super();
    this.state = {
        avatar: ''
      };
  }

  componentWillMount() {
    // let token = sessionStorage.getItem('token')
    request
      .get(API.HOST + API.PORT + '/api/user/1')
      .accept('json')
    //   .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .then((response) => {
              this.setState({
                  avatar: response.body.avatar,
                });
            });
  };

  render() {
    return (
      <div >
          <Image src='http://www.rbpost411.org/Page-Accessories/Profile%20Icon.jpg' circle width='45'/>
     </div>
    );
  }
}
