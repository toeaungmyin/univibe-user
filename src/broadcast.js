import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const options = {
	broadcaster: 'pusher',
	authEndpoint:
		'https://univibe-server-production-2df7.up.railway.app/broadcasting/auth',
	// 'http://127.0.0.1:8000/broadcasting/auth',
	key: 'ea35363792d83a5c687f', // Replace with your Pusher key
	cluster: 'ap1', // Replace with your Pusher cluster
	encrypted: true,
	auth: {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('user-token')}`,
			Accept: 'application/json',
		},
	},
};

const echo = new Echo(options);

export default echo;
