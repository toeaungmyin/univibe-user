import {
	ListItem,
	ListItemPrefix,
	Avatar,
	Typography,
	ListItemSuffix,
	Spinner,
} from '@material-tailwind/react';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../../ThemeContext/ThemeContext';
import { DefaultProfileAvatar } from '../../../assets/images';
import { markAsReadNotificationRequest } from '../../../service/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from '../../../features/auth/AuthSlice';
import { formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import { useNavigate } from 'react-router';

export function NotificationCard({ notification }) {
	const { theme } = useContext(ThemeContext);
	const [isLoading, setLoading] = useState(false);
	const auth = useSelector(state => state.authReducer);
	const notifications = auth.notifications;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const createdAt = new Date(notification.created_at);

	let timeAgo = '';
	if (isToday(createdAt)) {
		timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });
	} else if (isYesterday(createdAt)) {
		timeAgo = 'Yesterday';
	} else {
		timeAgo = createdAt.toDateString();
	}

	const handleMarkAsRead = async () => {
		try {
			setLoading(true);
			if (
				notification.type === 'new-account' ||
				notification.type === 'new-follower'
			) {
				navigate('/users/' + notification.user.id);
			} else if (
				notification.type === 'new-comment' ||
				notification.type === 'new-react'
			) {
				navigate('/posts/' + notification.user.id);
			}
			const response = await markAsReadNotificationRequest(
				notification.id
			);
			if (response.status === 200) {
				const filteredNotifications = notifications.filter(
					noti => noti.id !== notification.id
				);
				dispatch(getNotifications(filteredNotifications));
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<ListItem
			onClick={handleMarkAsRead}
			ripple={false}
			className={`shadow ${
				theme !== 'dark'
					? 'bg-white hover:bg-white focus:bg-white'
					: 'bg-gray-900 hover:bg-gray-900 focus:bg-gray-900'
			}`}>
			<ListItemPrefix>
				<div className='w-10 h-10 aspect-square'>
					{notification?.data?.user?.profile_url ? (
						<Avatar
							withBorder={notification?.data?.user?.online}
							className={
								notification?.data?.user?.online
									? 'p-0.5'
									: 'p-0'
							}
							color='cyan'
							variant='circular'
							size='sm'
							alt='tania andrew'
							onError={e => (e.target.src = DefaultProfileAvatar)}
							src={notification?.data?.user?.profile_url}
						/>
					) : (
						<Avatar
							withBorder={notification?.data?.user?.online}
							className={
								notification?.data?.user?.online
									? 'p-0.5'
									: 'p-0'
							}
							variant='circular'
							size='sm'
							alt='tania andrew'
							src={DefaultProfileAvatar}
						/>
					)}
				</div>
			</ListItemPrefix>
			<div>
				<Typography color={theme !== 'dark' ? 'blue-gray' : 'white'}>
					<span
						className={`font-medium text-sm ${
							theme !== 'dark'
								? 'text-blue-gray-700'
								: 'text-blue-gray-200'
						}`}>
						{notification.data.message}
					</span>
					<span
						className={`line-clamp-1 font-medium text-sm ${
							theme !== 'dark'
								? 'text-blue-gray-700'
								: 'text-blue-gray-200'
						}`}>
						{timeAgo}
					</span>
				</Typography>
			</div>
			<ListItemSuffix>
				{isLoading && <Spinner className='w-5 h-5' />}
			</ListItemSuffix>
		</ListItem>
	);
}
