import {
	Card,
	CardHeader,
	CardBody,
	Typography,
	IconButton,
	Button,
	CardFooter,
	Alert,
	Spinner,
} from '@material-tailwind/react';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../ThemeContext/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultProfileAvatar, ErrorImage } from '../../assets/images';
import { useNavigate, useParams } from 'react-router';
import { getUserDetail } from '../../service/User';
import { getSelectedUser } from '../../features/auth/UserSlice';
import {
	PencilSquareIcon,
	FlagIcon,
	TrashIcon,
} from '@heroicons/react/24/outline';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { EditProfile } from './EditProfile';
import UploadProfile from './UploadProfile';
import { followRequest, unfollowRequest } from '../../service/Follow';
import { getAuthUser } from '../../features/auth/AuthSlice';
import { Report } from './Report';
import DeleteAccountDialoag from './DeleteAccountDialog';

export function Profile() {
	const { theme } = useContext(ThemeContext);
	const navigate = useNavigate();
	const selectedUser = useSelector(state => state.userReducer.selectedUser);
	const auth = useSelector(state => state.authReducer.user);
	const isAuthUser = auth?.id === selectedUser?.id;
	const user = auth?.id === selectedUser?.id ? auth : selectedUser;
	const [isFriend, setFriend] = useState(false);
	const [isFollowing, setFollowing] = useState(false);
	const [buttonText, setButtonText] = useState(
		isFriend ? 'Unfriend' : isFollowing ? 'Unfollow' : 'follow'
	);

	const [isLoading, setLoading] = useState(false);
	const [openReportDialoag, setOpenPostReportDialoag] = useState(false);
	const handleOpenReportDialoag = () =>
		setOpenPostReportDialoag(prev => !prev);

	const posts = useSelector(state => state.userReducer.userPosts);
	const { userId } = useParams();
	const dispatch = useDispatch();
	const imageArray = (posts?.data.map(post => post.image) || []).filter(
		Boolean
	);
	const images = imageArray.length < 3 ? imageArray : imageArray.slice(0, 6);

	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(!open);

	const handleRelationship = () => {
		if (isFriend || isFollowing) {
			handleUnFollow(user.id);
		} else {
			handleFollow(user.id);
		}
	};

	const handleFollow = async userId => {
		try {
			setLoading(true);
			const response = await followRequest(userId);
			if (response.status === 200) {
				dispatch(getAuthUser(response.data.auth));
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleUnFollow = async userId => {
		try {
			setLoading(true);

			const response = await unfollowRequest(userId);
			if (response.status === 200) {
				dispatch(getAuthUser(response.data.auth));
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const [isOpenDeleteAccountDialoag, setOpenDeleteAccountDialoag] =
		useState(false);

	const handleDeleteAccountDialoag = () =>
		setOpenDeleteAccountDialoag(prev => !prev);

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

		return () => {
			dispatch(getSelectedUser(null));
		};
	}, [dispatch, userId]);

	useEffect(() => {
		const isFriendRes = auth?.friends?.some(
			friend => friend.id === selectedUser?.id
		);
		const isFollowingRes = auth?.followings?.some(
			following => following.id === selectedUser?.id
		);

		setFriend(isFriendRes);
		setFollowing(isFollowingRes);
	}, [selectedUser, auth]);

	useEffect(() => {
		setButtonText(
			isFriend ? 'Unfriend' : isFollowing ? 'Unfollow' : 'follow'
		);
	}, [isFriend, isFollowing]);
	return (
		<>
			<Card
				className={`w-full flex flex-col items-center rounded-none md:rounded-lg mt-8 md:mt-2 gap-4 ${
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
									className={`object-cover object-center rounded-full w-full h-full ${
										user?.online
											? 'border-2 border-cyan-500 bg-white p-1'
											: 'p-0'
									}`}
								/>
							) : (
								<img
									src={DefaultProfileAvatar}
									alt='profile'
									className={`object-cover object-center rounded-full w-full h-full ${
										user?.online
											? 'border-2 border-cyan-500 p-0.5'
											: 'p-0'
									}`}
								/>
							)}
							{userId === JSON.stringify(auth?.id) && (
								<UploadProfile />
							)}
						</div>
					</div>
					<div className='w-full h-full sm:w-3/5 flex flex-col justify-center items-center'>
						<div className='w-full flex flex-col gap-2 justify-center items-center md:items-start'>
							{user?.username && (
								<Typography
									variant='h4'
									color={
										theme !== 'dark' ? 'blue-gray' : 'white'
									}>
									{user?.username}
								</Typography>
							)}
							{user?.email && (
								<Typography
									variant='lead'
									color='cyan'
									className='text-sm'>
									{user?.email}
								</Typography>
							)}
						</div>
						<div className='w-full flex justify-center md:justify-start items-center gap-8'>
							<div className='flex flex-col items-center '>
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
							<div className='flex flex-col items-center '>
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
							<div className='flex flex-col items-center '>
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

						{selectedUser && !isAuthUser && (
							<div className='w-full flex justify-center md:justify-start p-4 md:px-0 pb-0 gap-4'>
								<Button
									onClick={handleRelationship}
									size='md'
									color='cyan'
									className='hover:shadow-none flex gap-2'
									disabled={isLoading ? true : false}>
									{isLoading ? (
										<Spinner
											className='w-5 h-5'
											color='white'
										/>
									) : (
										''
									)}
									{buttonText}
								</Button>
								<Button
									onClick={() =>
										navigate(`/chats/${selectedUser?.id}`)
									}
									size='md'
									color='cyan'
									className='hover:shadow-none'>
									Message
								</Button>
							</div>
						)}
					</div>
					{userId === JSON.stringify(auth?.id) ? (
						<div className='!absolute top-0 right-5 flex gap-2'>
							<IconButton
								onClick={handleOpen}
								size='sm'
								variant='text'>
								<PencilSquareIcon
									className='w-6 h-6'
									color={theme !== 'dark' ? 'black' : 'white'}
								/>
							</IconButton>
							<IconButton
								onClick={handleDeleteAccountDialoag}
								variant='outlined'
								color='red'
								size='sm'
								className='border-2'>
								<TrashIcon
									className='w-5 h-5'
									color='red'
								/>
							</IconButton>
						</div>
					) : (
						<IconButton
							onClick={handleOpenReportDialoag}
							variant='text'
							className='!absolute top-0 right-5'>
							<FlagIcon
								className='w-5 h-5'
								color={theme !== 'dark' ? 'black' : 'white'}
							/>
						</IconButton>
					)}
				</CardHeader>
				{auth?.warnings && auth?.warnings?.length !== 0 && (
					<CardBody className='w-full h-full p-2 flex flex-col gap-2'>
						<Alert
							variant='outlined'
							color='amber'
							icon={
								<ExclamationCircleIcon className='w-8 h-8' />
							}>
							<Typography className='font-medium'>
								Warning:
							</Typography>
							<ul className='mt-2 ml-2 list-inside list-disc'>
								{auth?.warnings?.map((warn, index) => (
									<li key={index}>
										<span className='font-medium'>
											{warn?.title}
										</span>
										<span>{warn?.description}</span>
									</li>
								))}
							</ul>
						</Alert>
					</CardBody>
				)}

				<CardFooter className='grid grid-cols-3 gap-1 w-full h-full p-2 pt-2 rounded-none'>
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
				</CardFooter>
			</Card>
			<EditProfile
				handleOpen={handleOpen}
				open={open}
			/>
			<Report
				openReportDialoag={openReportDialoag}
				handleOpenReportDialoag={handleOpenReportDialoag}
			/>
			<DeleteAccountDialoag
				isOpenDeleteAccountDialoag={isOpenDeleteAccountDialoag}
				handleDeleteAccountDialoag={handleDeleteAccountDialoag}
			/>
		</>
	);
}
