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
		const response = await api.put(`/users/${userId}`, data);
		return response;
	} catch (error) {
		throw error;
	}
};

export const uploadProfileRequest = async (userId, data) => {
	try {
		const response = await fileUploadApi.put(`/users/${userId}`, data);
		return response;
	} catch (error) {
		throw error;
	}
};
