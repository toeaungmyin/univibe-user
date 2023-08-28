import { api } from './api';

export const getNotificationRequest = async () => {
	try {
		const response = await api.get(`/notifications`);
		return response;
	} catch (error) {
		throw error;
	}
};

export const markAsReadNotificationRequest = async id => {
	try {
		const response = await api.post(`/notifications/${id}/mark-as-read`);
		return response;
	} catch (error) {
		throw error;
	}
};
