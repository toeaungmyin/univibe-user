import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	posts: null,
};

const loginSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		getPosts(state, action) {
			state.posts = action.payload;
		},
		getNextPosts(state, action) {
			state.posts.data = action.payload;
		},
	},
});

export const { getPosts, getNextPosts } = loginSlice.actions;

export default loginSlice.reducer;
