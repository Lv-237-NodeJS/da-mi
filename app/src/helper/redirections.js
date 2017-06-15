import { browserHistory } from 'react-router';

export default function checkAuth() {
  if (sessionStorage.getItem('token')) {
    browserHistory.push('/events');
  }
}
