import api from '../api/api';

export const registerRequest = async data => {
	const response = await api
		.post('/sign-up', data)
		.then(res => res)
		.catch(error => {
			return error.response;
		});
	return response;
};

export const loginRequest = data => {
	const response = api
		.post('/sign-in', data)
		.then(res => res)
		.catch(error => {
			return error.response;
		});
	return response;
};

export const emailVerifyRequest = async data => {
	const response = await api.post('/users/verify', data);
	return response;
};

export const reSendEmailVerifyRequest = async user_id => {
	const response = await api.post(`/users/verify/re-send`, {
		user_id: user_id,
	});
	return response;
};

export const userDataRequest = async () => {
	const response = await api.get(`users/profile`);
	return response;
};

export const logoutRequest = async () => {
	const response = await api.post('logout');
	localStorage.removeItem('user-token');
	return response;
};
