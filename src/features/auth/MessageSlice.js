import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	conversations: null,
	messages: null,
};

const messageSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		getConversations(state, action) {
			state.conversations = action.payload;
		},
		getMessages(state, action) {
			state.messages = action.payload;
		},
	},
});

export const { getConversations, getMessages } = messageSlice.actions;

export default messageSlice.reducer;
