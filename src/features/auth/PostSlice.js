import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	posts: {
		data: [],
	},
	selectedPost: null,
};

const postSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		getPosts(state, action) {
			state.posts = action.payload;
		},
		updatePost(state, action) {
			state.posts.data = action.payload;
		},
		getNextPosts(state, action) {
			state.posts.data = action.payload;
		},
		getSelectedPost(state, action) {
			state.selectedPost = action.payload;
		},
	},
});

export const { getPosts, updatePost, getNextPosts, getSelectedPost } =
	postSlice.actions;

export default postSlice.reducer;
