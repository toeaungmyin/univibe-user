import {
	ListItem,
	ListItemPrefix,
	Avatar,
	Typography,
	IconButton,
	ListItemSuffix,
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
	Spinner,
} from '@material-tailwind/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../../ThemeContext/ThemeContext';
import { DefaultProfileAvatar } from '../../../assets/images';
import { markAsReadNotificationRequest } from '../../../service/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from '../../../features/auth/AuthSlice';
import { formatDistanceToNow, isToday, isYesterday } from 'date-fns';

export function NotificationCard({ notification }) {
	const { theme } = useContext(ThemeContext);
	const [isLoading, setLoading] = useState(false);
	const notifications = useSelector(state => state.authReducer.notifications);
	const dispatch = useDispatch();

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
							variant='circular'
							size='sm'
							alt='tania andrew'
							className='border border-blue-500 p-0.5'
							onError={e => (e.target.src = DefaultProfileAvatar)}
							src={notification?.data?.user?.profile_url}
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
				</div>
			</ListItemPrefix>
			<div>
				<Typography
					variant='h6'
					color={theme !== 'dark' ? 'blue-gray' : 'white'}>
					<span className='font-medium'>
						{notification?.data?.user?.username}
					</span>
					<span
						className={`font-medium text-sm ms-[0.05rem] ${
							theme !== 'dark'
								? 'text-blue-gray-700'
								: 'text-blue-gray-200'
						}`}>
						{notification.data.message}
					</span>
				</Typography>
				<Typography
					variant='small'
					className={`font-normal ${
						theme !== 'dark'
							? 'text-blue-gray-700'
							: 'text-blue-gray-200'
					}`}>
					{timeAgo}
				</Typography>
			</div>
			<ListItemSuffix>
				{isLoading ? (
					<Spinner className='w-5 h-5' />
				) : (
					<Menu>
						<MenuHandler>
							<IconButton
								variant='text'
								className='rounded-full'>
								<EllipsisVerticalIcon className='w-5 h-5' />
							</IconButton>
						</MenuHandler>
						<MenuList>
							<MenuItem>
								<CheckBadgeIcon className='w-5 h-5' />
								<Typography variant='small'>Report</Typography>
							</MenuItem>
						</MenuList>
					</Menu>
				)}
			</ListItemSuffix>
		</ListItem>
	);
}
