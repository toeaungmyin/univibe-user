import api from '../api/api';
import multi_form_data from '../api/multi-form-data';

export const createPostRequest = async data => {
	try {
		const response = await multi_form_data.post('posts', data);
		return response;
	} catch (error) {
		throw error;
	}
};

export const postsRequest = async page => {
	try {
		const response = await api.get(`posts?page=${page}`);
		return response;
	} catch (error) {
		throw error;
	}
};

export const getUserPostsRequest = async (userId, page) => {
	try {
		const response = await api.get(`/users/${userId}/posts?page=${page}`);
		return response;
	} catch (error) {
		throw error;
	}
};

export const reactToPostRequest = async post => {
	try {
		const response = await api.post(`posts/${post}/react`);
		return response;
	} catch (error) {
		throw error;
	}
};

export const createCommentRequest = async data => {
	try {
		const response = await api.post(`/comments`, data);
		return response;
	} catch (error) {
		throw error;
	}
};
