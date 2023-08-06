import React from 'react';
import { useRoutes } from 'react-router';
import LoginPage from '../pages/LoginPage';
import Registerpage from '../pages/Registerpage';
import Layout from '../layout/Layout';
import HomePage from '../pages/HomePage';
import NotificationPage from '../pages/NotificationPage';

const Router = () => {
	const routes = useRoutes([
		{
			path: '/sign-in',
			element: <LoginPage />,
		},
		{
			path: '/sign-up',
			element: <Registerpage />,
		},
		{
			path: '/',
			element: <Layout />,
			children: [
				{
					element: <HomePage />,
					index: true,
				},
				{
					path: '/notifications',
					element: <NotificationPage />,
				},
			],
		},
	]);

	return routes;
};

export default Router;
