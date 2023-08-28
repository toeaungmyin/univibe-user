import React from 'react';
import Notifications from '../components/Section/Notifications/Notifications';

const NotificationPage = () => {
	return (
		<>
			<div className='w-full h-full overflow-auto no-scrollbar md:px-4'>
				<Notifications />
			</div>
		</>
	);
};

export default NotificationPage;
