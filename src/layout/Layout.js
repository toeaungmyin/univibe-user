import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router';
import { Header } from '../components/Header/Header';
import RightSidebar from '../components/RightSidebar/RightSidebar';
import LeftSidebar from '../components/LeftSidebar/LeftSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { authUserDataRequest } from '../service/Auth';
import { getAuthUser, getNotifications } from '../features/auth/AuthSlice';
import PreLoader from '../components/Loader/PreLoader';
import { ThemeContext } from '../ThemeContext/ThemeContext';
import { SidebarMenu } from '../components/SidebarMenu/SidebarMenu';
import echo from '../broadcast';
import { getNotificationRequest } from '../service/Notifications';

const Layout = () => {
	const auth = useSelector(state => state.authReducer);
	const dispatch = useDispatch();
	const { theme } = useContext(ThemeContext);

	useEffect(() => {
		const fetchUser = async () => {
			await authUserDataRequest()
				.then(response => {
					if (response?.status === 200) {
						console.log(response.data);
						dispatch(getAuthUser(response.data));
					}
				})
				.catch(error => {
					console.log(error);
				});
		};
		fetchUser();
	}, [dispatch]);


	useEffect(() => {
		const fetchNotification = async () => {
			try {
				const response = await getNotificationRequest();
				if (response.status === 200) {
					dispatch(getNotifications(response.data.notifications));
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchNotification();
	}, [dispatch]);

	useEffect(() => {
		echo.private(`App.Models.User.${auth?.user?.id}`).listen(
			'new-comment',
			data => {
				alert('Received comment notification:', data);
			}
		);

		return () => {
			// Unsubscribe or disconnect when the component unmounts, if necessary
			// echo.leave(`App.Models.User.${auth?.user?.id}`);
			// echo.disconnect();
		};
	}, [auth?.user?.id]);

	return (
		<>
			{auth.isLoggedIn ? (
				<div
					className={`w-full h-screen relative
					${theme !== 'dark' ? ' bg-blue-gray-50' : 'bg-black'}`}>
					<div className='fixed top-0 left-0 w-full z-[999]'>
						<Header />
					</div>
					<div className='relative top-[6.5rem] md:top-20 w-full h-[calc(100%-7rem)] md:h-[calc(100%-5rem)] flex justify-center overflow-auto'>
						<div className='hidden lg:block  lg:w-3/12 min-w-[18rem]'>
							<LeftSidebar />
						</div>
						<div className='w-full  lg:w-6/12 xl:w-5/12'>
							<Outlet />
						</div>
						<div className='hidden lg:block lg:w-3/12 min-w-[22rem]'>
							<RightSidebar />
						</div>
					</div>
					<SidebarMenu />
				</div>
			) : (
				<PreLoader />
			)}
		</>
	);
};

export default Layout;
