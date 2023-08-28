import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Avatar,
	IconButton,
	Button,
} from '@material-tailwind/react';
import { motion } from 'framer-motion';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { HeartIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reactToPostRequest } from '../../../service/Post';

import { ThemeContext } from '../../../ThemeContext/ThemeContext';
import { ErrorImage, DefaultProfileAvatar } from '../../../assets/images';
import { updatePost } from '../../../features/auth/PostSlice';
import { PostDetail } from './PostDetail';
import { useNavigate } from 'react-router';

export function PostCard({ post, posts }) {
	const { theme } = useContext(ThemeContext);
	const authUser = useSelector(state => state.authReducer.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [reaction, setReaction] = useState();
	const [openDetail, setOpenDetail] = useState(false);

	const handleOpenDetail = () => setOpenDetail(!openDetail);

	const giveReaction = () => {
		reactToPost();
		setReaction(!reaction);
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
				className={`w-full overflow-hidden rounded-none md:rounded-lg ${
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
								withBorder
								className='p-0.5'
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
								withBorder
								className='p-0.5'
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

							{post.created_at && (
								<Typography
									className='font-normal'
									variant='small'
									color={
										theme !== 'dark' ? 'blue-gray' : 'white'
									}>
									{post.created_at}
								</Typography>
							)}
						</div>
					</div>
					<div className='flex gap-2'>
						<IconButton
							variant='text'
							className='rounded-full'
							color='blue-gray'>
							<EllipsisHorizontalIcon className='w-6 x-6' />
						</IconButton>
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
								className='font-normal'>
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
		</>
	);
}
