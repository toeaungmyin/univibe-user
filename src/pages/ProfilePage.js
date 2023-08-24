import React, { useContext, useEffect } from 'react';
import { Header } from '../components/Header/Header';
import LeftSidebar from '../components/LeftSidebar/LeftSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { authUserDataRequest } from '../service/Auth';
import { getAuthUser } from '../features/auth/AuthSlice';
import PreLoader from '../components/Loader/PreLoader';
import { ThemeContext } from '../ThemeContext';
import { Profile } from '../components/Profile/Profile';
import PostCreateCard from '../components/Section/Post/PostCreate/PostCreateCard';
import Posts from '../components/Section/Post/Posts';
import UserPosts from '../components/Profile/UserPosts';

const ProfilePage = () => {
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
					<div className="fixed top-0 left-0 w-full z-[999]">
						<Header />
					</div>
					<div className="relative top-[5rem] w-full md:h-[calc(100%-5rem)] flex justify-center overflow-auto">
						<div className="hidden lg:block  lg:w-3/12 min-w-[18rem]">
							<LeftSidebar />
						</div>
						<div className="w-full  lg:w-6/12 xl:w-5/12">
							<div className="w-full h-full flex flex-col gap-2 overflow-auto no-scrollbar md:px-4">
								<Profile />
								<UserPosts />
							</div>
						</div>
						<div className="hidden lg:block lg:w-3/12 min-w-[22rem]"></div>
					</div>
				</div>
			) : (
				<PreLoader />
			)}
		</>
	);
};

export default ProfilePage;
