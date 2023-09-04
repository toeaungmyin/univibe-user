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

export const searchUserRequest = async key => {
	try {
		const response = await fileUploadApi.get(`search-user?query=${key}`);
		return response;
	} catch (error) {
		throw error;
	}
};

export const reportToUserRequest = async (userId, data) => {
	try {
		const response = await api.post(`users/${userId}/report`, data);
		return response;
	} catch (error) {
		throw error;
	}
};

export const deleteAccountRequest = async userId => {
	try {
		const response = await api.delete(`/users/${userId}?_method=DELETE`);
		return response;
	} catch (error) {
		throw error;
	}
};