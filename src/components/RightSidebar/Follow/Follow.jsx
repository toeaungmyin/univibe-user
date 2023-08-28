import { List, Card, Typography, CardHeader } from '@material-tailwind/react';
import { useContext } from 'react';
import { ThemeContext } from '../../../ThemeContext/ThemeContext';
import { useSelector } from 'react-redux';
import SuggestedUserItems from './SuggestedUserItems';

export function Follow() {
	const { theme } = useContext(ThemeContext);
	const suggestedUsers = useSelector(
		state => state.authReducer.suggestedUsers
	);

	return (
		<>
			{suggestedUsers?.length !== 0 && (
				<Card
					className={`w-full overflow-hidden ${
						theme !== 'dark' ? 'bg-white' : 'bg-gray-900'
					}`}>
					<CardHeader
						floated={false}
						shadow={false}
						color='transparent'
						className='my-2 rounded-none'>
						<Typography
							variant='h6'
							className={`${
								theme !== 'dark'
									? 'text-blue-gray-900'
									: 'text-blue-gray-100'
							}`}>
							People you may know
						</Typography>
					</CardHeader>

					<List className='p-0 gap-0 overflow-auto no-scrollbar'>
						{suggestedUsers?.map((user, index) => (
							<SuggestedUserItems
								key={index}
								user={user}
							/>
						))}
					</List>
				</Card>
			)}
		</>
	);
}
