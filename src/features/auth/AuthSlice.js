import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null,
	notifications: null,
	suggestedUsers: [],
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

export const { getAuthUser, getSuggestedUsers, getNotifications, logout } =
	authSlice.actions;

export default authSlice.reducer;
