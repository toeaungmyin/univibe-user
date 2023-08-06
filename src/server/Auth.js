import api from '../api/api';

export const registerRequest = async data => {
	try {
		const response = await api.post('sign-up', data);
		return response;
	} catch (error) {
		throw error;
	}
};

export const loginRequest = async data => {
	try {
		const response = await api.post('sign-in', data);
		return response;
	} catch (error) {
		throw error; // Throw the error to be caught in the catch block
	}
};

export const emailVerifyRequest = async data => {
	try {
		const response = await api.post('/users/verify', data);
		return response;
	} catch (error) {
		throw error; // Throw the error to be caught in the catch block
	}
};

export const reSendEmailVerifyRequest = async user_id => {
	try {
		const response = await api.post(`/users/verify/re-send`, {
			user_id: user_id,
		});
		return response;
	} catch (error) {
		throw error; // Throw the error to be caught in the catch block
	}
};

export const authUserDataRequest = async () => {
	try {
		const response = await api.get(`/me`);
		return response;
	} catch (error) {
		throw error; // Throw the error to be caught in the catch block
	}
};

export const logoutRequest = async () => {
	try {
		const response = await api.post('/logout');
		localStorage.removeItem('user-token');
		return response;
	} catch (error) {
		throw error.response; // Throw the error to be caught in the catch block
	}
};
