import {
	Avatar,
	Card,
	Chip,
	IconButton,
	Typography,
} from '@material-tailwind/react';
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
		<Card className='bg-cyan-600 w-full overflow-visible shadow-none rounded-none border-none p-2 flex flex-row justify-start gap-3 items-center'>
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
					withBorder
					variant='circular'
					size='md'
					alt='tania andrew'
					color='white'
					src={selectedUser?.profile_url}
					onError={e => (e.target.src = DefaultProfileAvatar)}
				/>
			) : (
				<Avatar
					withBorder
					variant='circular'
					size='md'
					alt='tania andrew'
					color='white'
					src={DefaultProfileAvatar}
				/>
			)}
			{selectedUser?.username && (
				<>
					<Typography
						variant='h6'
						className={`font-semibold ${
							theme !== 'dark'
								? 'text-blue-gray-50'
								: 'text-white'
						}`}>
						{selectedUser?.username}
					</Typography>
					{selectedUser?.online ? (
						<Chip
							className='bg-green-100 text-green-500'
							value='online'
						/>
					) : (
						<Chip
							className='bg-blue-gray-100 text-blue-gray-800'
							value='offline'
						/>
					)}
				</>
			)}
		</Card>
	);
};

export default ConversationHeader;
