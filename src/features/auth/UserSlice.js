import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	selectedUser:null,
	suggestedUsers: [],
	userPosts: null,
};

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		getSuggestedUsers(state, action) {
			state.suggestedUsers = action.payload;
		},
		getUserPosts(state, action) {
			state.userPosts = action.payload;
		},
		getNextUserPosts(state, action) {
			state.userPosts.data = [...state.userPosts.data, ...action.payload];
		},
		getSelectedUser(state, action) {
			state.selectedUser = action.payload;
		},
	},
});

export const { getSuggestedUsers, getUserPosts, getNextUserPosts,getSelectedUser } =
	userSlice.actions;

export default userSlice.reducer;
