import React, { useContext, useEffect, useState } from 'react';
import {
	Button,
	Dialog,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Textarea,
	IconButton,
	Select,
	Option,
	Spinner,
	Alert,
} from '@material-tailwind/react';
import { XMarkIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, updatePost } from '../../../../features/auth/PostSlice';
import { ThemeContext } from '../../../../ThemeContext/ThemeContext';
import { updatePostRequest } from '../../../../service/Post';
import { PhotoUpdate } from './PhotoUpdate';
import { updateUserPost } from '../../../../features/auth/UserSlice';

export function PostUpdateForm({
	post,
	isUpdateFormOpen,
	handleUpdateFormOpen,
}) {
	const posts = useSelector(state => state.postReducer.posts);
	const selectedUserPost = useSelector(state => state.userReducer.userPosts);
	const { theme } = useContext(ThemeContext);
	const [image, setImage] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [isRemoveImage, setRemoveImage] = useState(false);
	const dispatch = useDispatch();
	const [audience, setAudience] = useState(post?.audience);
	const handleAudienceChange = value => {
		setAudience(value);
	};
	const {
		register,
		formState: { errors },
		setError,
		handleSubmit,
		reset,
	} = useForm({
		defaultValues: {
			audience: post?.audience,
			content: post?.content,
		},
	});

	const createPost = async ({ content }) => {
		setLoading(true);
		// Create a new FormData
		const formData = new FormData();

		// Append other form data to the FormData

		formData.append('audience', audience);

		if (content) {
			formData.append('content', content); // Adjust file name if needed
		}
		// Append the image Blob
		if (image) {
			formData.append('image', image, image.name); // Adjust file name if needed
		}

		formData.append('isImageRemove', isRemoveImage); // Adjust file name if needed
		console.log(...formData);
		try {
			const res = await updatePostRequest(formData, post.id);
			if (res?.status === 200) {
				const updatedPost = res.data.post;
				if (posts.data) {
					const updatedPosts = [...posts.data];
					const postIndex = updatedPosts.findIndex(
						post => post.id === updatedPost.id
					);

					if (postIndex !== -1) {
						updatedPosts[postIndex] = updatedPost;
					}
					dispatch(updatePost(updatedPosts));
				}
				if (selectedUserPost?.data) {
					const updatedUserPosts = [...selectedUserPost?.data];
					const userPostIndex = updatedUserPosts.findIndex(
						p => p.id === updatedPost.id
					);
					if (userPostIndex !== -1) {
						updatedUserPosts[userPostIndex] = updatedPost;
						// Dispatch the updatedUserPost action with the updated data
						dispatch(updateUserPost(updatedUserPosts));
					}
				}

				handleUpdateFormOpen();
				reset();
			}
		} catch (error) {
			console.error('Error:', error);
			if (error?.status === 422) {
				const errors = error.data.errors;
				if (errors && errors.content) {
					setError('content', {
						type: 'server',
						message: errors.content,
					});
				} else if (errors && errors.image) {
					setError('image', {
						type: 'server',
						message: errors.image,
					});
				} else if (error.data.message) {
					setError('root', {
						type: 'server',
						message: error.data.message,
					});
				}
			}
		} finally {
			setLoading(false);
		}
	};

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
		<>
			<Dialog
				size={expand ? 'xxl' : 'md'}
				open={isUpdateFormOpen}
				handler={handleUpdateFormOpen}
				className={`bg-transparent shadow-none ${
					expand ? 'rounded-none h-full' : 'rounded-lg'
				}`}>
				<form onSubmit={handleSubmit(createPost)}>
					<Card
						className={`${
							expand ? 'h-screen' : 'h-full'
						} mx-auto w-full p-0 overflow-hidden ${
							theme === 'dark' ? 'bg-gray-900' : 'bg-white'
						}`}>
						<CardHeader
							variant='filled'
							color='transparent'
							shadow={false}
							floated={false}
							className='m-0 p-4 rounded-none grid place-items-center border-b border-blue-gray-300'>
							<div className='w-full flex justify-between items-center'>
								<div className='flex gap-2'>
									{expand && (
										<IconButton
											color='blue-gray'
											size='sm'
											variant='text'
											onClick={handleUpdateFormOpen}>
											<ChevronLeftIcon className='w-5 h-5' />
										</IconButton>
									)}
									<Typography
										variant='h5'
										color={
											theme !== 'dark' ? 'black' : 'white'
										}>
										Create New Post
									</Typography>
								</div>
								{!expand && (
									<IconButton
										color='blue-gray'
										size='sm'
										variant='text'
										onClick={handleUpdateFormOpen}>
										<XMarkIcon className='w-5 h-5' />
									</IconButton>
								)}
							</div>
						</CardHeader>
						<CardBody className='max-h-[40rem] md:max-h-[30rem] min-h-[20rem] flex flex-col gap-4 p-2 px-4 overflow-auto'>
							{(errors.content ||
								errors.image ||
								errors.audience ||
								errors.root) && (
								<Alert
									color='red'
									variant='ghost'
									className='p-2'>
									<div className='flex gap-2 items-center'>
										<ExclamationCircleIcon className='w-5 h-5' />
										<span className='font-medium text-sm'>
											{errors.audience?.message}
											{errors.content?.message}
											{errors.image?.message}
											{errors.root?.message}
										</span>
									</div>
								</Alert>
							)}
							<Textarea
								defaultValue={post?.content || ''}
								rows={5}
								placeholder='What about today?'
								className=' !border-0 focus:border-transparent mt-1'
								containerProps={{
									className: 'grid h-full',
								}}
								labelProps={{
									className:
										'before:content-none after:content-none',
								}}
								{...register('content')}
								error={errors.content ? true : false}
							/>
							<div className='px-2'>
								<PhotoUpdate
									post={post || null}
									isRemoveImage={isRemoveImage}
									setRemoveImage={setRemoveImage}
									setImage={setImage}
								/>
							</div>
						</CardBody>
						<CardFooter className='pt-2 flex flex-col gap-2'>
							<div className='flex justify-between items-center'>
								<div
									className={`w-40  ${
										theme === 'dark' &&
										'[&_ul]:bg-blue-gray-900 [&_ul]:border-blue-gray-700'
									}`}>
									<Select
										label='Post Audience'
										size='md'
										className={`${
											theme !== 'dark'
												? 'bg-white'
												: 'bg-gray-900 text-blue-gray-50'
										}`}
										value={audience}
										onChange={handleAudienceChange}>
										<Option value='public'>Public</Option>
										<Option value='friends'>Friends</Option>
										<Option value='private'>Private</Option>
									</Select>
								</div>
							</div>
							<Button
								variant='filled'
								fullWidth
								color='cyan'
								type='submit'
								className='flex justify-center items-center shadow-none hover:shadow-none focus:shadow-none'>
								{isLoading ? (
									<Spinner
										className='h-4 w-4 me-3'
										color='white'
									/>
								) : (
									''
								)}
								Create
							</Button>
						</CardFooter>
					</Card>
				</form>
			</Dialog>
		</>
	);
}
