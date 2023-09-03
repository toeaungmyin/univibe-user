import { Avatar, Typography } from '@material-tailwind/react';
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../../ThemeContext/ThemeContext';
import { DefaultProfileAvatar } from '../../../assets/images';
import { useSelector } from 'react-redux';

const Message = ({ message }) => {
	const { theme } = useContext(ThemeContext);
	const authUser = useSelector(state => state.authReducer.user);
	const [showTime, setShowTime] = useState();
	return (
		<div
			onClick={() => setShowTime(prev => !prev)}
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
				{showTime && message?.created_at && (
					<Typography
						variant='small'
						className='text-xs font-medium'
						color={theme !== 'dark' ? 'blue-gray' : 'white'}>
						{message.created_at}
					</Typography>
				)}
			</div>
		</div>
	);
};

export default Message;
