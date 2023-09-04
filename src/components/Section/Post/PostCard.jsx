import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Avatar,
	IconButton,
	Button,
	MenuHandler,
	Menu,
	MenuItem,
	MenuList,
} from '@material-tailwind/react';
import { motion } from 'framer-motion';
import {
	EllipsisHorizontalIcon,
	UserGroupIcon,
	UsersIcon,
	EyeSlashIcon,
} from '@heroicons/react/24/solid';
import {
	HeartIcon,
	ChatBubbleLeftIcon,
	FlagIcon,
	PencilSquareIcon,
	TrashIcon,
} from '@heroicons/react/24/outline';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePostRequest, reactToPostRequest } from '../../../service/Post';

import { ThemeContext } from '../../../ThemeContext/ThemeContext';
import { ErrorImage, DefaultProfileAvatar } from '../../../assets/images';
import { updatePost } from '../../../features/auth/PostSlice';
import { PostDetail } from './PostDetail';
import { useNavigate } from 'react-router';
import { updateUserPost } from '../../../features/auth/UserSlice';
import { PostUpdateForm } from './PostUpdate/PostUpdateForm';
import { PostReport } from './PostReport/PostReport';

export function PostCard({ post, posts }) {
	const { theme } = useContext(ThemeContext);
	const authUser = useSelector(state => state.authReducer.user);
	const selectedUserPosts = useSelector(state => state.userReducer.userPosts);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [reaction, setReaction] = useState();
	const [openDetail, setOpenDetail] = useState(false);
	const [openPostReportDialoag, setOpenPostReportDialoag] = useState(false);
	const handleOpenPostReportDialoag = () =>
		setOpenPostReportDialoag(prev => !prev);
	const handleOpenDetail = () => setOpenDetail(!openDetail);

	const giveReaction = () => {
		reactToPost();
		setReaction(!reaction);
	};

	const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);
	const handleUpdateFormOpen = () => setUpdateFormOpen(cur => !cur);

	const handleDeletePost = async () => {
		try {
			const response = await deletePostRequest(post.id);
			if (response.status === 200) {
				if (posts) {
					const updatedPosts = posts.filter(p => p.id !== post.id);
					dispatch(updatePost(updatedPosts));
				}

				if (selectedUserPosts?.data) {
					const updatedUserPosts = selectedUserPosts.data.filter(
						p => p.id !== post.id
					);
					// Dispatch the updatedUserPost action with the updated data
					dispatch(updateUserPost(updatedUserPosts));
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const reactToPost = async () => {
		try {
			// Send a request to react to the post and get the updated post data.
			const response = await reactToPostRequest(post.id);
			if (response.status === 200) {
				const updatedPost = response.data.post;
				const updatedPosts = [...posts];
				const postIndex = updatedPosts.findIndex(p => p.id === post.id);

				// If the post is found, update it with the new data, including reactions.
				if (postIndex !== -1) {
					updatedPosts[postIndex] = updatedPost;
				}

				// Dispatch the updated posts.
				dispatch(updatePost(updatedPosts));

				if (selectedUserPosts) {
					const updatedUserPost = [...selectedUserPosts?.data];
					const userPostIndex = updatedUserPost.findIndex(
						p => p.id === post.id
					);
					if (userPostIndex !== -1) {
						updatedUserPost[userPostIndex] = updatedPost;

						// Dispatch the updatedUserPost action with the updated data
						dispatch(updateUserPost(updatedUserPost));
					}
				}
			}
			// Clone the existing posts array and find the index of the post to update.
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		// Check if the authenticated user has reacted to the post
		const userReacted = post?.reactions?.some(
			user => user.id === authUser.id
		);
		// Set the setReaction state based on the user's reaction status
		setReaction(userReacted);
	}, [post, authUser]);

	return (
		<>
			<Card
				className={`w-full overflow-hidden rounded-none md:rounded-md ${
					theme !== 'dark' ? 'bg-white' : 'bg-gray-900'
				}`}>
				<CardHeader
					floated={false}
					shadow={false}
					color='transparent'
					className='m-0 rounded-none flex justify-between p-4'>
					<div
						onClickCapture={() => {
							navigate(`/profile/${post.user?.id}`);
						}}
						className='flex items-center gap-2  cursor-pointer'>
						{post?.user?.profile_url ? (
							<Avatar
								withBorder={post?.user?.online}
								className={post?.user?.online ? 'p-0.5' : 'p-0'}
								variant='circular'
								alt='candice'
								color='cyan'
								onError={e =>
									(e.target.src = DefaultProfileAvatar)
								}
								src={post.user.profile_url}
							/>
						) : (
							<Avatar
								withBorder={post?.user?.online}
								className={post?.user?.online ? 'p-0.5' : 'p-0'}
								variant='circular'
								alt='candice'
								color='cyan'
								src={DefaultProfileAvatar}
							/>
						)}

						<div className='flex flex-col'>
							{post.user?.username && (
								<Typography
									variant='h6'
									className='font-medium'
									color={
										theme !== 'dark' ? 'blue-gray' : 'white'
									}>
									{post.user.username}
								</Typography>
							)}
							<div className='flex gap-2'>
								{post.audience &&
									(post.audience === 'public' ? (
										<UserGroupIcon className='w-4 x-4' />
									) : post.audience === 'friends' ? (
										<UsersIcon className='w-4 x-4' />
									) : (
										<EyeSlashIcon className='w-4 x-4' />
									))}
								{post.created_at && (
									<Typography
										className='font-normal'
										variant='small'
										color={
											theme !== 'dark'
												? 'blue-gray'
												: 'white'
										}>
										{post.created_at}
									</Typography>
								)}
							</div>
						</div>
					</div>
					<div className='flex gap-2'>
						<Menu className='p-2'>
							<MenuHandler>
								<IconButton
									variant='text'
									className='rounded-full'
									color='blue-gray'>
									<EllipsisHorizontalIcon className='w-6 x-6' />
								</IconButton>
							</MenuHandler>
							<MenuList
								className={
									theme === 'dark'
										? 'bg-gray-900 border-gray-800'
										: ''
								}>
								{authUser.id === post.user.id && (
									<MenuItem
										onClick={handleUpdateFormOpen}
										className={`flex gap-2 ${
											theme === 'dark'
												? ' hover:bg-gray-800  focus:bg-gray-800 text-blue-gray-50 hover:text-blue-gray-50 focus:text-blue-gray-50'
												: ''
										}`}>
										<PencilSquareIcon className='w-4 h-4' />
										Edit
									</MenuItem>
								)}
								<MenuItem
									onClick={handleOpenPostReportDialoag}
									className={`flex gap-2 ${
										theme === 'dark'
											? ' hover:bg-gray-800  focus:bg-gray-800 text-blue-gray-50 hover:text-blue-gray-50 focus:text-blue-gray-50'
											: ''
									}`}>
									<FlagIcon className='w-4 h-4' />
									Report
								</MenuItem>
								{authUser.id === post.user.id && (
									<MenuItem
										onClick={handleDeletePost}
										className={`flex gap-2 text-red-500 hover:bg-red-50 hover:text-red-500 focus:bg-red-50 focus:text-red-500 ${
											theme === 'dark'
												? ' hover:bg-gray-800  focus:bg-gray-800 '
												: ''
										}`}>
										<TrashIcon className='w-4 h-4 ' />
										Delete
									</MenuItem>
								)}
							</MenuList>
						</Menu>
					</div>
				</CardHeader>
				<CardBody className='p-0 w-full'>
					{post?.image && (
						<img
							src={post.image}
							onError={e => (e.target.src = ErrorImage)}
							alt='ui/ux review check'
							className={`object-cover w-full max-h-96 border-y-2 ${
								theme !== 'dark'
									? 'border-blue-gray-50'
									: 'border-blue-gray-900'
							}`}
						/>
					)}
					{post?.content && (
						<div
							className={`p-4 pt-0 border-b-2 ${
								theme !== 'dark'
									? 'border-blue-gray-50'
									: 'border-blue-gray-900'
							}`}>
							<Typography
								variant='paragraph'
								color={theme !== 'dark' ? 'blue-gray' : 'white'}
								className='font-normal py-2'>
								{post.content.length > 100 ? (
									<>
										{post.content.slice(0, 100) + '...'}
										<Button
											size='sm'
											variant='text'
											className='inline-block p-0 rounded-none'
											ripple={false}
											onClick={handleOpenDetail}>
											see more
										</Button>
									</>
								) : (
									post.content
								)}
							</Typography>
						</div>
					)}
				</CardBody>
				<CardFooter className={`flex p-0 `}>
					<div className='flex gap-4 items-center px-4 py-2'>
						<div className='flex items-center gap-2'>
							<motion.div
								whileHover={{ scale: 0.9 }}
								whileTap={{ scale: 1.1 }}
								style={{ x: 0 }}>
								<HeartIcon
									className='w-6 h-6'
									color={reaction ? 'red' : 'gray'}
									fill={reaction ? 'red' : 'none'}
									onClick={() => giveReaction()}
								/>
							</motion.div>

							<Typography
								variant='small'
								className='font-medium select-none'>
								{post.reactions.length}
							</Typography>
						</div>
						<div className='flex items-center gap-2'>
							<motion.div
								whileHover={{ scale: 0.9 }}
								whileTap={{ scale: 1.1 }}
								style={{ x: 0 }}>
								<ChatBubbleLeftIcon
									className='w-6 h-6'
									color='gray'
									onClick={() => handleOpenDetail()}
								/>
							</motion.div>
							<Typography
								variant='small'
								className='font-medium select-none'>
								{post.comments.length}
							</Typography>
						</div>
					</div>
				</CardFooter>
			</Card>
			<PostDetail
				post={post}
				reaction={reaction}
				giveReaction={giveReaction}
				open={openDetail}
				handleOpen={handleOpenDetail}
			/>
			<PostUpdateForm
				post={post}
				isUpdateFormOpen={isUpdateFormOpen}
				handleUpdateFormOpen={handleUpdateFormOpen}
			/>
			<PostReport
				post={post}
				openPostReportDialoag={openPostReportDialoag}
				handleOpenPostReportDialoag={handleOpenPostReportDialoag}
			/>
		</>
	);
}
