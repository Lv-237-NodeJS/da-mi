import defaults from 'superagent-defaults';

const superagent = defaults();
const token = sessionStorage.getItem('token');

token && superagent.set('x-access-token', token);

export default superagent;
