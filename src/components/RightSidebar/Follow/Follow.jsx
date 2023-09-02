import { List, Card, Typography, CardHeader } from '@material-tailwind/react';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../../../ThemeContext/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import SuggestedUserItems from './SuggestedUserItems';
import { suggestUser } from '../../../service/Follow';
import { getSuggestedUsers } from '../../../features/auth/AuthSlice';

export function Follow() {
	const { theme } = useContext(ThemeContext);
	const dispatch = useDispatch();
	const suggestedUsers = useSelector(
		state => state.authReducer.suggestedUsers
	);

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
		<>
			{suggestedUsers?.length !== 0 && (
				<Card
					className={`w-full rounded-md overflow-hidden ${
						theme !== 'dark' ? 'bg-white' : 'bg-gray-900'
					}`}>
					<CardHeader
						floated={false}
						shadow={false}
						color='transparent'
						className='my-2 rounded-none overflow-visible'>
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

					<List className='p-0 gap-1 pb-2 overflow-auto no-scrollbar'>
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
