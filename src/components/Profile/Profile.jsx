import {
	Card,
	CardHeader,
	CardBody,
	Typography,
	IconButton,
} from '@material-tailwind/react';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultProfileAvatar, ErrorImage } from '../../assets/images';
import { useParams } from 'react-router';
import { getUserDetail } from '../../service/User';
import { getSelectedUser } from '../../features/auth/UserSlice';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { EditProfile } from './EditProfile';
import UploadProfile from './UploadProfile';

export function Profile() {
	const { theme } = useContext(ThemeContext);
	const user = useSelector(state => state.userReducer.selectedUser);
	const auth = useSelector(state => state.authReducer.user);
	const posts = useSelector(state => state.userReducer.userPosts);
	const { userId } = useParams();
	const dispatch = useDispatch();
	const imageArray = (posts?.data.map(post => post.image) || []).filter(
		Boolean
	);
	const images = imageArray.length < 3 ? imageArray : imageArray.slice(0, 6);

	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(!open);

	useEffect(() => {
		const fetchUserDetail = async () => {
			try {
				const response = await getUserDetail(userId);
				dispatch(getSelectedUser(response.data));
			} catch (error) {
				console.log(error);
			}
		};
		fetchUserDetail();
	}, [dispatch, userId]);
	return (
		<>
			<Card
				className={`w-full flex flex-col items-center rounded-none md:rounded-lg mt-8 md:mt-2 ${
					theme !== 'dark' ? 'bg-white' : 'bg-gray-900'
				}`}>
				<CardHeader
					floated={false}
					shadow={false}
					className='w-full h-full flex flex-col md:flex-row gap-4 overflow-visible rounded-none bg-transparent'>
					<div className='w-full h-full sm:w-2/5 flex items-center justify-center md:justify-end'>
						<div className='relative w-[10rem] h-[10rem] bg-cyan-500 rounded-full p-1'>
							{user?.profile_url ? (
								<img
									src={user?.profile_url}
									onError={e =>
										(e.target.src = DefaultProfileAvatar)
									}
									alt='profile'
									className='object-cover object-center w-full h-full'
								/>
							) : (
								<img
									src={DefaultProfileAvatar}
									alt='profile'
									className='object-cover object-center w-full h-full'
								/>
							)}
							<UploadProfile />
						</div>
					</div>
					<div className='w-full h-full sm:w-3/5 flex flex-col justify-center items-center'>
						<div className='w-full flex flex-col justify-center items-center md:items-start'>
							{user?.username && (
								<Typography
									variant='h4'
									color={
										theme !== 'dark' ? 'blue-gray' : 'white'
									}
									className='mb-2'>
									{user?.username}
								</Typography>
							)}
							{user?.email && (
								<Typography
									variant='lead'
									color='cyan'
									className='mb-2 text-sm'>
									{user?.email}
								</Typography>
							)}
						</div>
						<div className='w-full flex justify-center md:justify-start items-center gap-8'>
							<div className='flex flex-col '>
								{user?.followers && (
									<Typography
										variant='h5'
										color={
											theme !== 'dark'
												? 'blue-gray'
												: 'white'
										}>
										{user?.followers.length}
									</Typography>
								)}
								<Typography
									variant='small'
									color={
										theme !== 'dark' ? 'blue-gray' : 'white'
									}>
									Followers
								</Typography>
							</div>
							<div className='flex flex-col '>
								{user?.followings && (
									<Typography
										variant='h5'
										color={
											theme !== 'dark'
												? 'blue-gray'
												: 'white'
										}>
										{user?.followings.length}
									</Typography>
								)}
								<Typography
									variant='small'
									color={
										theme !== 'dark' ? 'blue-gray' : 'white'
									}>
									Followings
								</Typography>
							</div>
							<div className='flex flex-col '>
								{user?.friends && (
									<Typography
										variant='h5'
										color={
											theme !== 'dark'
												? 'blue-gray'
												: 'white'
										}>
										{user?.friends.length}
									</Typography>
								)}
								<Typography
									variant='small'
									color={
										theme !== 'dark' ? 'blue-gray' : 'white'
									}>
									Friends
								</Typography>
							</div>
						</div>
					</div>
					{userId === JSON.stringify(auth.id) && (
						<IconButton
							onClick={handleOpen}
							variant='text'
							className='!absolute top-0 right-5'>
							<PencilSquareIcon
								className='w-6 h-6'
								color={theme !== 'dark' ? 'black' : 'white'}
							/>
						</IconButton>
					)}
				</CardHeader>
				<CardBody className='grid grid-cols-3 gap-1 w-full h-full p-2 pt-4 rounded-none'>
					{images?.map((img, index) => (
						<div
							key={index}
							className='w-full h-full aspect-square bg-black rounded-md shadow-blue-gray-900/50'>
							<img
								className='object-cover object-center w-full h-full rounded-md hover:opacity-70 transition-opacity'
								src={img}
								onError={e => (e.target.src = ErrorImage)}
								alt='nature'
							/>
						</div>
					))}
				</CardBody>
			</Card>
			<EditProfile
				handleOpen={handleOpen}
				open={open}
			/>
		</>
	);
}
