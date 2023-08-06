import React from 'react';
import { NotificationCard } from './NotificationCard';
import { Card, List } from '@material-tailwind/react';
import { Logo } from '../../../assets/images';

const Notifications = () => {
	return (
		<Card className="max-w-[38rem] mx-auto overflow-hidden bg-transparent shadow-none">
			<List className="items-center gap-2">
				<NotificationCard
					user={{ name: 'Toe Aung Myin' }}
					profile_url={Logo}
					notification={{
						description: ' Welcome to Univibe',
						created_at: 'Jul 21 at 8:28 Am',
					}}
				/>
				<NotificationCard
					user={{ name: 'Emily Johnson' }}
					profile_url={
						'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=600'
					}
					notification={{
						description: ' commented on your post',
						created_at: 'Jul 21 at 8:28 Am',
					}}
				/>
				<NotificationCard
					user={{ name: 'Benjamin Patel' }}
					profile_url={
						'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600'
					}
					notification={{
						description: ' liked your post',
						created_at: 'Jul 21 at 8:28 Am',
					}}
				/>
				<NotificationCard
					user={{ name: 'Olivia Anderson' }}
					profile_url={
						'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=600'
					}
					notification={{
						description: ' commented on your post',
						created_at: 'Jul 21 at 8:28 Am',
					}}
				/>
				<NotificationCard
					user={{ name: 'Tania Andrew' }}
					profile_url={
						'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600'
					}
					notification={{
						description: ' liked your post',
						created_at: 'Jul 21 at 8:28 Am',
					}}
				/>
				<NotificationCard
					user={{ name: 'Benjamin Patel' }}
					profile_url={
						'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600'
					}
					notification={{
						description: ' liked your post',
						created_at: 'Jul 21 at 8:28 Am',
					}}
				/>

				<NotificationCard
					user={{ name: 'Tania Andrew' }}
					profile_url={
						'https://images.pexels.com/photos/5378700/pexels-photo-5378700.jpeg?auto=compress&cs=tinysrgb&w=600'
					}
					notification={{
						description: ' followed you',
						created_at: 'Jul 21 at 8:28 Am',
					}}
				/>
				<NotificationCard
					user={{ name: 'Olivia Anderson' }}
					profile_url={
						'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=600'
					}
					notification={{
						description: ' commented on your post',
						created_at: 'Jul 21 at 8:28 Am',
					}}
				/>
			</List>
		</Card>
	);
};

export default Notifications;
