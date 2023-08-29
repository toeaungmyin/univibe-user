import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/AuthSlice';
import userReducer from './auth/UserSlice';
import postReducer from './auth/PostSlice';
import messageReducer from './auth/MessageSlice';

export const store = configureStore({
	reducer: {
		authReducer,
		userReducer,
		postReducer,
		messageReducer,
	},
});
