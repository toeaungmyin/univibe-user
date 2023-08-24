import api from '../api/api';

export const followRequest = async user => {
	try {
		const response = await api.post(`/users/${user}/follow`);
		return response;
	} catch (error) {
		throw error;
	}
};

export const suggestUser = async user => {
	try {
		const response = await api.get(`/users/suggest/random`);
		return response;
	} catch (error) {
		throw error;
	}
};
