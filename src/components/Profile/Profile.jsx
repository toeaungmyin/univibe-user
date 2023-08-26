import {
	Card,
	CardHeader,
	CardBody,
	Typography,
} from '@material-tailwind/react';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../../ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultProfileAvatar } from '../../assets/images';
import { useParams } from 'react-router';
import { getUserDetail } from '../../service/User';
import { getSelectedUser } from '../../features/auth/UserSlice';

export function Profile() {
	const { theme } = useContext(ThemeContext);
	const user = useSelector(state => state.userReducer.selectedUser);
	const { userId } = useParams();
	const dispatch = useDispatch();

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
		<Card
			className={`w-full min-h-[16rem] overflow-hidden rounded-none md:rounded-lg mt-2 ${
				theme !== 'dark' ? 'bg-white' : 'bg-gray-900'
			}`}
		>
			<CardHeader
				floated={false}
				shadow={false}
				className='flex justify-center items-center gap-8'
			>
				<div className='w-1/4'>
					<div className='max-w-[12rem] max-h-[12rem] bg-cyan-700 rounded-full p-1'>
						{user?.profile_url && (
							<img
								src={user?.profile_url}
								onError={e =>
									(e.target.src = DefaultProfileAvatar)
								}
								alt='profile'
								className='object-center object-contain w-full h-full'
							/>
						)}
					</div>
				</div>
				<div className='w-2/4 flex flex-col gap-2'>
					<div className='w-full'>
						{user?.username && (
							<Typography
								variant='h4'
								color='blue-gray'
								className='mb-2'
							>
								{user?.username}
							</Typography>
						)}
						{user?.email && (
							<Typography
								variant='lead'
								color='cyan'
								className='mb-2 text-sm'
							>
								{user?.email}
							</Typography>
						)}
					</div>
					<div className='flex items-center gap-8'>
						<div className='flex flex-col '>
							{user?.followers && (
								<Typography
									variant='h5'
									color='blue-gray'
								>
									{user?.followers.length}
								</Typography>
							)}
							<Typography
								variant='small'
								color='blue-gray'
							>
								Followers
							</Typography>
						</div>
						<div className='flex flex-col '>
							{user?.followings && (
								<Typography
									variant='h5'
									color='blue-gray'
								>
									{user?.followings.length}
								</Typography>
							)}
							<Typography
								variant='small'
								color='blue-gray'
							>
								Followings
							</Typography>
						</div>
						<div className='flex flex-col '>
							{user?.friends && (
								<Typography
									variant='h5'
									color='blue-gray'
								>
									{user?.friends.length}
								</Typography>
							)}
							<Typography
								variant='small'
								color='blue-gray'
							>
								Friends
							</Typography>
						</div>
					</div>
				</div>
			</CardHeader>
			<CardBody className=''>Hello</CardBody>
		</Card>
	);
}
