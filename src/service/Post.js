import { api, fileUploadApi } from './api';

export const createPostRequest = async data => {
	try {
		const response = await fileUploadApi.post('posts', data);
		return response;
	} catch (error) {
		throw error;
	}
};

export const updatePostRequest = async (data, postId) => {
	try {
		const response = await fileUploadApi.post(
			`posts/${postId}?_method=PUT`,
			data
		);
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

export const reportToPostRequest = async (postId, data) => {
	try {
		const response = await api.post(`posts/${postId}/report`, data);
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

export const deletePostRequest = async postId => {
	try {
		const response = await api.delete(`/posts/${postId}?_method=DELETE`);
		return response;
	} catch (error) {
		throw error;
	}
};