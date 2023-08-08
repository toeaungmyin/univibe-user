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
	},
});

export const { getPosts } = loginSlice.actions;

export default loginSlice.reducer;
