import { api } from './api';

export const getConversationsRequest = async () => {
	try {
		const response = await api.get(`/conversations`);
		return response;
	} catch (error) {
		throw error;
	}
};

export const getMessagesRequest = async userId => {
	try {
		const response = await api.get(`/users/${userId}/conversation`);
		return response;
	} catch (error) {
		throw error;
	}
};

export const sendMssageRequest = async data => {
	try {
		const response = await api.post(`/messages`, data);
		return response;
	} catch (error) {
		throw error;
	}
};

export const deleteMessageRequest = async messageId => {
	try {
		const response = await api.delete(
			`/messages/${messageId}?_method=DELETE`
		);
		return response;
	} catch (error) {
		throw error;
	}
};
