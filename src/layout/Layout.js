import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router';
import { Header } from '../components/Header/Header';
import RightSidebar from '../components/RightSidebar/RightSidebar';
import LeftSidebar from '../components/LeftSidebar/LeftSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { authUserDataRequest } from '../service/Auth';
import { getAuthUser } from '../features/auth/AuthSlice';
import PreLoader from '../components/Loader/PreLoader';
import { ThemeContext } from '../ThemeContext';

const Layout = () => {
	const auth = useSelector(state => state.authReducer);
	const dispatch = useDispatch();
	const { theme } = useContext(ThemeContext);

	useEffect(() => {
		const fetchUser = async () => {
			await authUserDataRequest()
				.then(response => {
					if (response?.status === 200) {
						dispatch(getAuthUser(response.data));
					}
				})
				.catch(error => {
					console.log(error);
				});
		};
		fetchUser();
	}, [dispatch]);

	return (
		<>
			{auth.isLoggedIn ? (
				<div
					className={`w-full h-screen relative
					${theme !== 'dark' ? ' bg-blue-gray-50' : 'bg-black'}`}
				>
					<div className='fixed top-0 left-0 w-full z-[999]'>
						<Header />
					</div>
					<div className='relative top-28 md:top-20 w-full h-[calc(100%-7rem)] md:h-[calc(100%-5rem)] flex justify-center overflow-auto'>
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
				</div>
			) : (
				<PreLoader />
			)}
		</>
	);
};

export default Layout;
