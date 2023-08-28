import {
	Avatar,
	Button,
	ListItem,
	ListItemPrefix,
	ListItemSuffix,
	Spinner,
	Typography,
} from '@material-tailwind/react';
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../ThemeContext/ThemeContext';
import { useNavigate } from 'react-router';
import { DefaultProfileAvatar } from '../../../assets/images';
import { followRequest, suggestUser } from '../../../service/Follow';
import { getSuggestedUsers } from '../../../features/auth/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';

const SuggestedUserItems = ({ user }) => {
	const suggestedUsers = useSelector(
		state => state.authReducer.suggestedUsers
	);
	const { theme } = useContext(ThemeContext);
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const [isLoading, setLoading] = useState(false);

	const handleFollow = async userId => {
		try {
			setLoading(true);
			const response = await followRequest(userId);
			if (response.status === 200) {
				setLoading(false);
				const filteredUser = suggestedUsers.filter(
					user => user.id !== userId
				);
				dispatch(getSuggestedUsers(filteredUser));
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const getUserSuggestion = async () => {
			try {
				const response = await suggestUser();
				if (response.status === 200) {
					dispatch(
						getSuggestedUsers([...response.data.random_users])
					);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getUserSuggestion();
	}, [dispatch]);
	return (
		<ListItem
			className={`rounded-none ${
				theme !== 'dark'
					? 'bg-white shadow hover:bg-white focus:bg-white'
					: 'bg-gray-900 shadow hover:bg-gray-900 focus:bg-gray-900'
			}`}
			ripple={false}>
			<ListItemPrefix onClick={() => navigate(`/profile/${user?.id}`)}>
				{user?.porfile_url ? (
					<Avatar
						withBorder
						className='p-0.5'
						variant='circular'
						alt='candice'
						src={user?.porfile_url}
					/>
				) : (
					<Avatar
						withBorder
						className='p-0.5'
						variant='circular'
						alt='candice'
						src={DefaultProfileAvatar}
					/>
				)}
			</ListItemPrefix>
			<div onClick={() => navigate(`/profile/${user?.id}`)}>
				{user.username && (
					<Typography
						variant='h6'
						className={`${
							theme !== 'dark'
								? 'text-blue-gray-900'
								: 'text-blue-gray-100'
						}`}>
						{user?.username}
					</Typography>
				)}
			</div>
			<ListItemSuffix>
				<Button
					size='sm'
					color='cyan'
					onClick={() => handleFollow(user.id)}
					className='px-2'>
					{isLoading ? (
						<Spinner
							className='h-4 w-4 me-3'
							color='white'
						/>
					) : (
						''
					)}{' '}
					Follow
				</Button>
			</ListItemSuffix>
		</ListItem>
	);
};

export default SuggestedUserItems;
