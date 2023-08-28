import React, { useEffect } from 'react';
import { NotificationCard } from './NotificationCard';
import { Card, List, Spinner } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationRequest } from '../../../service/Notifications';
import { getNotifications } from '../../../features/auth/AuthSlice';

const Notifications = () => {
	const notifications = useSelector(state => state.authReducer.notifications);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchNotification = async () => {
			try {
				const response = await getNotificationRequest();
				if (response.status === 200) {
					dispatch(getNotifications(response.data.notifications));
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchNotification();
	}, [dispatch]);
	return (
		<Card className='max-w-[38rem] mx-auto overflow-hidden bg-transparent shadow-none'>
			<List className={`items-center gap-2`}>
				{notifications?.length !== 0 ? (
					notifications?.map((notification, index) => (
						<NotificationCard
							key={index}
							notification={notification}
						/>
					))
				) : (
					<Spinner
						className='mt-5 h-12 w-12'
						color='cyan'
					/>
				)}
			</List>
		</Card>
	);
};

export default Notifications;
