import {
	Avatar,
	Button,
	ListItem,
	ListItemPrefix,
	ListItemSuffix,
	Typography,
} from '@material-tailwind/react';
import React, { useContext } from 'react';
import { ThemeContext } from '../../../ThemeContext/ThemeContext';
import { DefaultProfileAvatar } from '../../../assets/images';
import { getAuthUser } from '../../../features/auth/AuthSlice';
import { followRequest } from '../../../service/Follow';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const FollowBackUserItems = ({ follower }) => {
	const { theme } = useContext(ThemeContext);
	const authUser = useSelector(state => state.authReducer.user);
	const followers = authUser?.followers;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleFollow = async userId => {
		try {
			const response = await followRequest(userId);
			if (response.status === 200) {
				const filteredUser = followers.filter(
					user => user.id !== userId
				);
				const updatedAuthUser = {
					...authUser,
					followers: filteredUser,
				};
				dispatch(getAuthUser(updatedAuthUser));
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<ListItem
			className={
				theme !== 'dark'
					? 'bg-white shadow hover:bg-white focus:bg-white'
					: 'bg-gray-900 shadow hover:bg-gray-900 focus:bg-gray-900'
			}
			ripple={false}>
			<ListItemPrefix
				className='flex gap-2'
				onClick={() => navigate(`/profile/${follower?.id}`)}>
				{follower?.profile_url ? (
					<Avatar
						variant='circular'
						size='sm'
						withBorder
						className='p-0.5'
						alt='candice'
						onError={e => (e.target.src = DefaultProfileAvatar)}
						src={follower?.profile_url}
					/>
				) : (
					<Avatar
						variant='circular'
						size='sm'
						withBorder
						className='p-0.5'
						alt='candice'
						src={DefaultProfileAvatar}
					/>
				)}
			</ListItemPrefix>
			<div onClick={() => navigate(`/profile/${follower?.id}`)}>
				{follower?.username && (
					<Typography
						variant='h6'
						className='font-medium'
						color={theme !== 'dark' ? 'blue-gray' : 'white'}>
						{follower?.username}
					</Typography>
				)}
			</div>
			<ListItemSuffix>
				<Button
					onClick={() => handleFollow(follower.id)}
					size='sm'
					color='cyan'
					className='hover:shadow-none px-2'>
					Follow Back
				</Button>
			</ListItemSuffix>
		</ListItem>
	);
};

export default FollowBackUserItems;
