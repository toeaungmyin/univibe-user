import {
	Avatar,
	ListItem,
	ListItemPrefix,
	ListItemSuffix,
	Typography,
} from '@material-tailwind/react';
import React, { useContext } from 'react';
import { DefaultProfileAvatar } from '../../../assets/images';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../../../ThemeContext/ThemeContext';

const ConversationItmes = ({ conversation }) => {
	const authUser = useSelector(state => state.authReducer.user);
	const navigate = useNavigate();
	const { theme } = useContext(ThemeContext);
	const otherUser =
		conversation.user1.id !== authUser.id
			? conversation.user1
			: conversation.user2;
	return (
		<ListItem
			className={
				theme !== 'dark'
					? ''
					: 'hover:bg-blue-gray-900 focus:bg-blue-gray-900'
			}
			onClick={() => navigate(`/chats/${otherUser.id}`)}>
			<ListItemPrefix>
				{otherUser?.profile_url ? (
					<Avatar
						variant='circular'
						size='sm'
						alt='tania andrew'
						className='border border-blue-500 p-0.5'
						onError={e => (e.target.src = DefaultProfileAvatar)}
						src={otherUser?.profile_url}
					/>
				) : (
					<Avatar
						variant='circular'
						size='sm'
						alt='tania andrew'
						className='border border-blue-500 p-0.5'
						src={DefaultProfileAvatar}
					/>
				)}
			</ListItemPrefix>
			<div>
				{otherUser.username && (
					<Typography
						variant='h6'
						color={theme !== 'dark' ? 'blue-gray' : 'white'}>
						{otherUser.username}
					</Typography>
				)}
				{conversation?.latest_message && (
					<Typography
						variant='small'
						className={`font-normal ${
							theme !== 'dark'
								? 'text-blue-gray-900'
								: 'text-blue-gray-300'
						}`}>
						{conversation.latest_message}
					</Typography>
				)}
			</div>
			{conversation?.latest_message_at && (
				<ListItemSuffix>
					<Typography
						variant='small'
						color='gray'
						className='font-normal text-xs'>
						{conversation?.latest_message_at}
					</Typography>
				</ListItemSuffix>
			)}
		</ListItem>
	);
};

export default ConversationItmes;
