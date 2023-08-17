import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import { Header } from '../components/Header/Header';
import RightSidebar from '../components/RightSidebar/RightSidebar';
import LeftSidebar from '../components/LeftSidebar/LeftSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { authUserDataRequest } from '../server/Auth';
import { getAuthUser } from '../features/auth/AuthSlice';
import PreLoader from '../components/Loader/PreLoader';

const Layout = () => {
	const auth = useSelector(state => state.authReducer);
	const dispatch = useDispatch();

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
				<div className="w-full h-screen relative bg-blue-gray-50">
					<div className="fixed top-0 left-0 w-full z-[999]">
						<Header />
					</div>
					<div className="relative top-[4.5rem] w-full h-[calc(100%-5rem)] flex justify-center overflow-auto">
						<div className="hidden lg:block  lg:w-3/12">
							<LeftSidebar />
						</div>
						<div className="w-full  lg:w-6/12 xl:w-5/12">
							<Outlet />
						</div>
						<div className="hidden lg:block lg:w-3/12">
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
