import {
	Avatar,
	ListItem,
	ListItemPrefix,
	ListItemSuffix,
	Typography,
} from '@material-tailwind/react';
import React from 'react';
import { DefaultProfileAvatar } from '../../../assets/images';
import { useNavigate } from 'react-router';

const ConversationItmes = () => {
	const navigate = useNavigate();
	return (
		<ListItem onClick={() => navigate('/chat/1')}>
			<ListItemPrefix>
				{/* {notification?.data?.user?.profile_url ? (
					<Avatar
						variant='circular'
						size='sm'
						alt='tania andrew'
						className='border border-blue-500 p-0.5'
						onError={e => (e.target.src = DefaultProfileAvatar)}
						src={notification?.data?.user?.profile_url}
					/>
				) : ( */}
				<Avatar
					variant='circular'
					size='sm'
					alt='tania andrew'
					className='border border-blue-500 p-0.5'
					src={DefaultProfileAvatar}
				/>
				{/* )} */}
			</ListItemPrefix>
			<div>
				<Typography
					variant='h6'
					color='blue-gray'>
					Tania Andrew
				</Typography>
				<Typography
					variant='small'
					color='gray'
					className='font-normal'>
					How are you?
				</Typography>
			</div>
			<ListItemSuffix>
				<Typography
					variant='small'
					color='gray'
					className='font-normal'>
					15 min ago
				</Typography>
			</ListItemSuffix>
		</ListItem>
	);
};

export default ConversationItmes;
