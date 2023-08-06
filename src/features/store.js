import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/AuthSlice';
import postReducer from './auth/PostSlice';

export const store = configureStore({
	reducer: {
		authReducer,
		postReducer,
	},
});
