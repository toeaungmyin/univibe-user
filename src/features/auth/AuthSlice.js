import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null,
	notifications: null,
	suggestedUsers: [],
	chatSuggestUser: [],
	isLoggedIn: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		getAuthUser(state, action) {
			state.user = action.payload;
			state.isLoggedIn = true;
		},
		getSuggestedUsers(state, action) {
			state.suggestedUsers = action.payload;
		},
		getChatSuggestUser(state) {
			const allUsers = [
				...state.user.friends,
				...state.user.followings,
				...state.user.followers,
			];

			state.chatSuggestUser = [...new Set(allUsers)];
		},

		getNotifications(state, action) {
			state.notifications = action.payload;
		},
		logout(state) {
			state.user = null;
			state.isLoggedIn = false;
			state.isLoading = false;
			state.error = null;
		},
	},
});

export const {
	getAuthUser,
	getSuggestedUsers,
	getNotifications,
	getChatSuggestUser,
	logout,
} = authSlice.actions;

export default authSlice.reducer;
