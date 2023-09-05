import { Avatar, Button, Spinner, Typography } from '@material-tailwind/react';
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../../ThemeContext/ThemeContext';
import { DefaultProfileAvatar } from '../../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMessageRequest } from '../../../service/Message';
import { getMessages } from '../../../features/auth/MessageSlice';

const Message = ({ message, show, setShow }) => {
	const { theme } = useContext(ThemeContext);
	const authUser = useSelector(state => state.authReducer.user);
	const [isLoading, setLoading] = useState(false);
	const messages = useSelector(state => state.messageReducer.messages);
	const dispatch = useDispatch();
	const deleteMessage = async messageId => {
		try {
			setLoading(true);
			const response = await deleteMessageRequest(messageId);
			if (response.status === 200) {
				const filteredMessage = messages.filter(
					m => m.id !== message.id
				);
				dispatch(getMessages(filteredMessage));
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			onClick={() => setShow(message?.id)}
			className={`flex gap-2 ${
				message?.sender?.id === authUser?.id && 'flex-row-reverse'
			}`}>
			{message?.sender?.id !== authUser?.id && (
				<div className='min-w-[2.5rem]'>
					{message?.sender?.profile_url ? (
						<Avatar
							withBorder={message?.sender?.online}
							className={
								message?.sender?.online ? 'p-0.5' : 'p-0'
							}
							size='sm'
							variant='circular'
							alt='candice'
							color='cyan'
							onError={e => (e.target.src = DefaultProfileAvatar)}
							src={message?.sender?.profile_url}
						/>
					) : (
						<Avatar
							withBorder={message?.sender?.online}
							className={
								message?.sender?.online ? 'p-0.5' : 'p-0'
							}
							size='sm'
							variant='circular'
							alt='candice'
							color='cyan'
							src={DefaultProfileAvatar}
						/>
					)}
				</div>
			)}
			<div
				className={`flex flex-col ${
					message?.sender?.id === authUser?.id
						? 'items-end'
						: 'items-start'
				}`}>
				<div
					className={`border ${
						message?.sender?.id === authUser?.id
							? 'border-cyan-600 bg-cyan-600'
							: theme !== 'dark'
							? 'border-blue-gray-100 bg-blue-gray-50'
							: 'border-gray-800 bg-gray-800'
					}  p-2 rounded-lg `}>
					{message?.content && (
						<Typography
							variant='small'
							className='text-sm font-medium'
							color={
								message?.sender?.id === authUser?.id
									? 'white'
									: theme !== 'dark'
									? 'blue-gray'
									: 'white'
							}>
							{message?.content}
						</Typography>
					)}
				</div>
				{show === message?.id && message?.created_at && (
					<div className='flex gap-2'>
						<Typography
							variant='small'
							className='text-xs font-medium'
							color={theme !== 'dark' ? 'blue-gray' : 'white'}>
							{message.created_at}
						</Typography>
						{authUser?.id === message.sender.id && (
							<Button
								className='p-0 text-xs font-medium lowercase rounded-none'
								color='blue-gray'
								variant='text'
								onClick={() => deleteMessage(message?.id)}>
								{isLoading ? (
									<Spinner className='w-3 h-3' />
								) : (
									'delete'
								)}
							</Button>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Message;
