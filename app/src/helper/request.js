import defaults from 'superagent-defaults';

const superagent = defaults();
const token = sessionStorage.getItem('token');
const userId = sessionStorage.getItem('userId');

token && superagent.set('x-access-token', token);

export default superagent;
