import { api, fileUploadApi } from './api';

export const getUserDetail = async userId => {
	try {
		const response = await api.get(`/users/${userId}`);
		return response;
	} catch (error) {
		throw error;
	}
};

export const updateUserRequest = async (userId, data) => {
	try {
		const response = await fileUploadApi.post(
			`/users/${userId}?_method=PUT`,
			data
		);
		return response;
	} catch (error) {
		throw error;
	}
};