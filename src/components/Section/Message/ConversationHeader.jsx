import { Avatar, Card, IconButton, Typography } from '@material-tailwind/react';
import React, { useContext } from 'react';
import { DefaultProfileAvatar } from '../../../assets/images';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { ThemeContext } from '../../../ThemeContext/ThemeContext';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const ConversationHeader = () => {
	const { theme } = useContext(ThemeContext);
	const selectedUser = useSelector(state => state.userReducer.selectedUser);
	const navigate = useNavigate();
	return (
		<Card className='bg-cyan-600 w-full shadow-none rounded-none border-none p-2 flex flex-row justify-start gap-3 items-center'>
			<IconButton
				variant='text'
				onClick={() => navigate(-1)}>
				<ChevronLeftIcon
					className={`w-5 h-5 font-medium ${
						theme !== 'dark'
							? 'text-blue-gray-50'
							: 'text-blue-gray-100'
					}`}
				/>
			</IconButton>
			{selectedUser?.profile_url ? (
				<Avatar
					withBorder={selectedUser?.online}
					className={selectedUser?.online ? 'border-4 p-0.5' : 'p-0'}
					variant='circular'
					size='md'
					alt='tania andrew'
					color='green'
					src={selectedUser?.profile_url}
					onError={e => (e.target.src = DefaultProfileAvatar)}
				/>
			) : (
				<Avatar
					withBorder={selectedUser?.online}
					className={selectedUser?.online ? 'border-4 p-0.5' : 'p-0'}
					variant='circular'
					size='md'
					alt='tania andrew'
					color='cyan'
					src={DefaultProfileAvatar}
				/>
			)}
			{selectedUser?.username && (
				<Typography
					variant='h6'
					className={`font-semibold ${
						theme !== 'dark' ? 'text-blue-gray-50' : 'text-white'
					}`}>
					{selectedUser?.username}
				</Typography>
			)}
		</Card>
	);
};

export default ConversationHeader;
