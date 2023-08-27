import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	posts: {
		data: [],
	},
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
	},
});

export const { getPosts, updatePost, getNextPosts } = postSlice.actions;

export default postSlice.reducer;
