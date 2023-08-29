import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../../ThemeContext/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
	Avatar,
	IconButton,
	Spinner,
	Textarea,
} from '@material-tailwind/react';
import { DefaultProfileAvatar } from '../../../assets/images';
import { sendMssageRequest } from '../../../service/Message';
import { getMessages } from '../../../features/auth/MessageSlice';

const MessageForm = () => {
	const { theme } = useContext(ThemeContext);

	const authUser = useSelector(state => state.authReducer.user);
	const selectedUser = useSelector(state => state.userReducer.selectedUser);
	const messages = useSelector(state => state.messageReducer.messages);

	const [isLoading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const {
		register,
		formState: { errors },
		setError,
		handleSubmit,
		reset,
	} = useForm({
		defaultValues: {
			sender_id: authUser?.id,
			receiver_id: selectedUser?.id,
			content: '',
		},
	});

	const sendMessage = async data => {
		try {
			setLoading(true);
			const body = {
				...data,
				sender_id: authUser?.id,
				receiver_id: selectedUser?.id,
			};

			const response = await sendMssageRequest(body);
			console.log(response);
			if (response.status === 200) {
				console.log(response.data);
				dispatch(getMessages([...messages, response.data.message]));
				reset();
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const isDarkTheme = theme === 'dark';
	const ErrorMessage = errors.comment?.message || errors.root?.message;
	const placeholderText = ErrorMessage ? ErrorMessage : 'Message';

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
	return (
		<div className='w-full p-2'>
			<div
				className={`w-full rounded-3xl border p-1 ${
					isDarkTheme
						? 'border-gray-50/10 bg-black'
						: 'border-gray-900/10 bg-gray-200'
				}`}>
				<form
					className='flex flex-row items-center gap-2'
					onSubmit={handleSubmit(sendMessage)}>
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
						{...register('content', {
							required: 'Message is required',
						})}
						error={!!errors.content}
					/>

					<div>
						<IconButton
							variant='text'
							className='rounded-full'
							disabled={isLoading}
							type='submit'>
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
		</div>
	);
};

export default MessageForm;
