import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null,
	isLoggedIn: false,
};

const loginSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		getAuthUser(state, action) {
			state.user = action.payload;
			state.isLoggedIn = true;
		},
		logout(state) {
			state.user = null;
			state.isLoggedIn = false;
			state.isLoading = false;
			state.error = null;
		},
	},
});

export const { getAuthUser, logout } = loginSlice.actions;

export default loginSlice.reducer;
