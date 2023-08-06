import api from '../api/api';

export const createPostRequest = async data => {
	try {
		const response = await api.post('posts', data);
		return response;
	} catch (error) {
		throw error;
	}
};
