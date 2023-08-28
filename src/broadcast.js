import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const options = {
	broadcaster: 'pusher',
	authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
	key: '028f33976a54b774aaa7', // Replace with your Pusher key
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

echo.private(`App.Models.User.2`).listen('new-comment', data => {
	alert('Received comment notification:', data);
});

export default echo;
