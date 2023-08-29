import { List, Card, Typography, CardHeader } from '@material-tailwind/react';
import { useContext } from 'react';
import { ThemeContext } from '../../../ThemeContext/ThemeContext';
import { useSelector } from 'react-redux';
import FollowBackUserItems from './FollowBackUserItems';

export function Followback() {
	const { theme } = useContext(ThemeContext);
	const authUser = useSelector(state => state.authReducer.user);
	const followers = authUser?.followers;

	return (
		<>
			{followers?.length !== 0 && (
				<Card
					className='w-full rounded-md'
					shadow={false}
					color='transparent'>
					<CardHeader
						floated={false}
						shadow={false}
						className='mx-0 mt-0 mb-2 rounded-none'
						color='transparent'>
						<Typography
							variant='h6'
							className={`${
								theme !== 'dark'
									? 'text-blue-gray-900'
									: 'text-blue-gray-500'
							}`}>
							People who followed you
						</Typography>
					</CardHeader>
					<List className='p-0 gap-4'>
						{followers?.map((follower, index) => (
							<FollowBackUserItems
								key={index}
								follower={follower}
							/>
						))}
					</List>
				</Card>
			)}
		</>
	);
}
