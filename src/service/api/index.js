// api.js

import axios from 'axios';

export const HOST = {
	SERVER: 'https://univibe-server-production-2df7.up.railway.app/api/v1',
	LOCAL: 'http://127.0.0.1:8000/api/v1',
};

export const API_SERVER_URL = HOST.SERVER;

const createApiInstance = (baseURL, contentType) => {
	const instance = axios.create({
		baseURL,
	});

	instance.interceptors.request.use(config => {
		const accessToken = localStorage.getItem('user-token');
		config.headers.Authorization = `Bearer ${accessToken}`;
		config.headers.Accept = 'application/json';
		config.headers['Content-Type'] = contentType;
		return config;
	});

	instance.interceptors.response.use(
		response => response,
		error => {
			const status = error.response?.status || 500;
			if (status === 401) {
				window.location.href = '/sign-in';
			} else if (status === 403) {
				window.location.href = '/';
			} else {
				throw error.response;
			}
		}
	);

	return instance;
};

const api = createApiInstance(API_SERVER_URL, 'application/json');
const fileUploadApi = createApiInstance(API_SERVER_URL, 'multipart/form-data;');

export { api, fileUploadApi };
