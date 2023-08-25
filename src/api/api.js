import axios from 'axios';

const api = axios.create({
	baseURL: 'https://univibe-server-production-2df7.up.railway.app/api/v1',
	// baseURL: 'http://127.0.0.1:8000/api/v1',
});

api.interceptors.request.use(config => {
	const accessToken = localStorage.getItem('user-token');
	config.headers.set('Authorization', `Bearer ${accessToken}`);
	config.headers.set('Accept', 'application/json');
	config.headers.set('Content-Type', 'application/json');
	return config;
});

api.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		const status = error.response?.status || 500;
		if (status === 401) {
			window.location.href = '/sign-in';
		} else if (status === 403) {
			window.location.href = '/';
		} else {
			throw error;
		}
	}
);

export default api;
