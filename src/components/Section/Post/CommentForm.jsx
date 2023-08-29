import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { createCommentRequest } from '../../../service/Post';
import { updatePost } from '../../../features/auth/PostSlice';
import {
	Textarea,
	IconButton,
	Avatar,
	Spinner,
} from '@material-tailwind/react';
import { DefaultProfileAvatar } from '../../../assets/images';
import { ThemeContext } from '../../../ThemeContext/ThemeContext';
import { updateUserPost } from '../../../features/auth/UserSlice';

export function CommentForm({ post }) {
	const { theme } = useContext(ThemeContext);

	const authUser = useSelector(state => state.authReducer.user);
	const posts = useSelector(state => state.postReducer.posts.data);
	const selectedUserPost = useSelector(state => state.userReducer.userPosts);
	const [isLoading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const {
		register,
		formState: { errors },
		setError,
		handleSubmit,
		reset,
	} = useForm({});

	const isDarkTheme = theme === 'dark';
	const commentErrorMessage = errors.comment?.message || errors.root?.message;
	const placeholderText = commentErrorMessage
		? commentErrorMessage
		: 'Write your opinion...';

	const textareaClasses = [
		'min-h-full',
		'!border-0',
		'focus:border-transparent',
		isDarkTheme ? ' text-blue-gray-50' : 'bg-gray-800 text-blue-gray-900',
		errors.comment || errors.root
			? isDarkTheme
				? 'placeholder:text-red-500'
				: 'placeholder:text-red-900'
			: isDarkTheme
			? 'placeholder:text-blue-gray-500'
			: 'placeholder:text-blue-gray-900',
	].join(' ');

	// Handle the comment submission
	const createComment = async ({ comment }) => {
		try {
			setLoading(true);
			const response = await createCommentRequest({
				post_id: post.id,
				comment,
			});

			if (response.status === 200) {
				const updatedPost = response.data.post;
				if (posts) {
					const updatedPosts = [...posts];
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
			}

			reset();
		} catch (error) {
			console.error('Error:', error);

			if (error?.response?.status === 422) {
				const errors = error.response.data.errors;
				if (errors && errors.comment) {
					setError('comment', {
						type: 'server',
						message: errors.comment,
					});
				} else if (error.response.data.message) {
					setError('root', {
						type: 'server',
						message: error.response.data.message,
					});
				}
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className={`w-full rounded-3xl border p-1 ${
				isDarkTheme
					? 'border-gray-50/10 bg-black'
					: 'border-gray-900/10 bg-gray-300'
			}`}>
			<form
				className='flex flex-row items-center gap-2'
				onSubmit={handleSubmit}>
				{authUser?.profile_url ? (
					<Avatar
						withBorder
						className='p-0.5'
						variant='circular'
						alt='candice'
						color='cyan'
						onError={e => (e.target.src = DefaultProfileAvatar)}
						src={authUser?.profile_url}
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
				<Textarea
					rows={1}
					resize={true}
					placeholder={placeholderText}
					className={textareaClasses}
					containerProps={{
						className: 'grid h-full',
					}}
					labelProps={{
						className: 'before:content-none after:content-none',
					}}
					{...register('comment', {
						required: 'Comment is required',
					})}
					error={!!errors.comment}
				/>

				<div>
					<IconButton
						variant='text'
						className='rounded-full'
						disabled={isLoading}
						onClick={handleSubmit(createComment)}>
						{isLoading ? (
							<Spinner className='w-5 h-5' />
						) : (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								strokeWidth={2}
								className='h-5 w-5'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
								/>
							</svg>
						)}
					</IconButton>
				</div>
			</form>
		</div>
	);
}
