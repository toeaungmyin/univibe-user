import React, { useContext, useEffect, useState } from 'react';
import {
	Dialog,
	Typography,
	CardFooter,
	CardBody,
	IconButton,
	Avatar,
	CardHeader,
	Card,
	DialogHeader,
	DialogBody,
} from '@material-tailwind/react';
import { motion } from 'framer-motion';
import {
	ChevronLeftIcon,
	EllipsisHorizontalIcon,
} from '@heroicons/react/24/solid';
import { HeartIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { ErrorImage, DefaultProfileAvatar } from '../../../assets/images';
import { ThemeContext } from '../../../ThemeContext/ThemeContext';
import CommentBox from './CommentBox';

export function PostDetail({ post, reaction, giveReaction, open, handleOpen }) {
	const { theme } = useContext(ThemeContext);
	const [expand, setExpand] = useState(false);

	useEffect(() => {
		// Define a media query for screens with a max width of 960px
		const mediaQuery = window.matchMedia('(max-width: 960px)');

		// Initial check and set state based on the media query
		setExpand(mediaQuery.matches);

		// Add a listener for changes to the media query
		const mediaQueryListener = event => {
			setExpand(event.matches);
		};

		// Add the listener to the media query
		mediaQuery.addListener(mediaQueryListener);

		// Clean up the listener when the component unmounts
		return () => {
			mediaQuery.removeListener(mediaQueryListener);
		};
	}, []);
	return (
		<Dialog
			open={open}
			handler={handleOpen}
			size={expand ? 'xxl' : 'sm'}
			className='overflow-hidden'>
			<DialogHeader
				className={`flex justify-start gap-2 items-center border-b ${
					theme !== 'dark'
						? ' border-blue-gray-100'
						: 'bg-gray-900 border-black'
				}`}>
				<ChevronLeftIcon
					onClick={handleOpen}
					className={`w-5 h-5 font-medium ${
						theme !== 'dark' ? 'text-black' : 'text-blue-gray-100'
					}`}
				/>

				<Typography
					variant='h5'
					color={theme !== 'dark' ? 'blue-gray' : 'white'}
					className='font-medium'>
					{post?.user?.username + "' post"}
				</Typography>
			</DialogHeader>
			<DialogBody
				className={`${
					expand ? 'h-screen' : 'h-[38rem]'
				}  overflow-y-scroll no-scrollbar p-0 md:p-2 ${
					theme !== 'dark' ? 'bg-blue-gray-50' : 'bg-gray-900'
				}`}>
				<Card
					className={`w-full overflow-hidden border  rounded-none md:rounded-lg  ${
						theme !== 'dark'
							? 'bg-white border-blue-gray-50'
							: 'bg-gray-900 border-blue-gray-900'
					}`}>
					<CardHeader
						floated={false}
						shadow={false}
						color='transparent'
						className='m-0 rounded-none flex justify-between p-4'>
						<div className='flex items-center gap-2'>
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
											theme !== 'dark'
												? 'blue-gray'
												: 'white'
										}>
										{post.user.username}
									</Typography>
								)}

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

						<div className='p-4 pt-0'>
							{post?.content && (
								<Typography
									variant='paragraph'
									color={
										theme !== 'dark' ? 'blue-gray' : 'white'
									}
									className='font-normal'>
									{post.content}
								</Typography>
							)}
						</div>
					</CardBody>
					<CardFooter
						className={`flex flex-col p-0 border-t-2 ${
							theme !== 'dark'
								? 'border-blue-gray-50'
								: 'border-blue-gray-900'
						}`}>
						<div
							className={`flex gap-4 items-center px-4 py-2 border-b-2 ${
								theme !== 'dark'
									? 'border-blue-gray-50'
									: 'border-blue-gray-900'
							}`}>
							<div className='flex justify-between items-center gap-2'>
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
									/>
								</motion.div>
								<Typography
									variant='small'
									className='font-medium select-none'>
									{post.comments.length}
								</Typography>
							</div>
						</div>
						<CommentBox post={post} />
					</CardFooter>
				</Card>
			</DialogBody>
		</Dialog>
	);
}
