import { browserHistory } from 'react-router';

export default function checkAuth() {
  !!sessionStorage.getItem('token') && browserHistory.push('/events');
}
