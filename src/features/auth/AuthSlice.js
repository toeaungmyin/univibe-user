import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: {},
};

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		getUser(state, action) {
			state.user = action.payload;
		},
		logout(state) {
			state.user = null;
			state.isLoggedIn = false;
			state.isLoading = false;
			state.error = null;
		},
	},
});

export const { getUser, logout } = loginSlice.actions;

export default loginSlice.reducer;
