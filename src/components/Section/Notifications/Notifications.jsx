import React, { useEffect } from 'react';
import { NotificationCard } from './NotificationCard';
import {
	Card,
	CardBody,
	List,
	Spinner,
	Typography,
} from '@material-tailwind/react';
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
				{notifications?.length !== 0 && notifications !== null ? (
					notifications?.map((notification, index) => (
						<NotificationCard
							key={index}
							notification={notification}
						/>
					))
				) : notifications === null ? (
					<Spinner
						className='mt-5 h-12 w-12'
						color='cyan'
					/>
				) : (
					<Card
						shadow={false}
						color='transparent'
						className='w-full text-center'>
						<CardBody>
							<Typography
								variant='h5'
								className='mb-2 to-blue-gray-700'>
								No New Notifications
							</Typography>
						</CardBody>
					</Card>
				)}
			</List>
		</Card>
	);
};

export default Notifications;
