import api from "../api/api";

export const getUserDetail = async (userId) => {
    try {
        const response = await api.get(`/users/${userId}`);
        return response;
    } catch (error) {
        throw error;
    }
};
