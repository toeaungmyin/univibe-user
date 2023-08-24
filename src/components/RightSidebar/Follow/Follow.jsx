import {
	List,
	ListItem,
	ListItemPrefix,
	Avatar,
	Card,
	Typography,
	ListItemSuffix,
	Button,
	CardHeader,
} from '@material-tailwind/react';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../../../ThemeContext';
import { followRequest, suggestUser } from '../../../service/Follow';
import { DefaultProfileAvatar } from '../../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { getSuggestedUsers } from '../../../features/auth/AuthSlice';

export function Follow() {
	const { theme } = useContext(ThemeContext);
	const suggestedUsers = useSelector(state => state.authReducer.suggestedUsers);

	const dispatch = useDispatch();

	const handleFollow = async userId => {
		try {
			const response = await followRequest(userId);
			if (response.status === 200) {
				const filteredUser = suggestedUsers.filter(user => user.id !== userId);
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
					dispatch(getSuggestedUsers([...response.data.random_users]));
				}
			} catch (error) {
				console.log(error);
			}
		};
		getUserSuggestion();
	}, [dispatch]);

	return (
		<Card
			className={`w-full overflow-hidden ${
				theme !== 'dark' ? 'bg-white' : 'bg-gray-900'
			}`}
		>
			<CardHeader
				floated={false}
				shadow={false}
				color="transparent"
				className="my-2 rounded-none"
			>
				<Typography
					variant="h6"
					className={`${
						theme !== 'dark' ? 'text-blue-gray-900' : 'text-blue-gray-100'
					}`}
				>
					People you may know
				</Typography>
			</CardHeader>
			{suggestedUsers && (
				<List className="p-0 gap-0 overflow-auto no-scrollbar">
					{suggestedUsers?.map((user, index) => (
						<ListItem
							key={index}
							className={`rounded-none ${
								theme !== 'dark'
									? 'bg-white shadow hover:bg-white focus:bg-white'
									: 'bg-gray-900 shadow hover:bg-gray-900 focus:bg-gray-900'
							}`}
							ripple={false}
						>
							<ListItemPrefix>
								{user?.porfile_url ? (
									<Avatar
										withBorder
										className="p-0.5"
										variant="circular"
										alt="candice"
										src={user?.porfile_url}
									/>
								) : (
									<Avatar
										withBorder
										className="p-0.5"
										variant="circular"
										alt="candice"
										src={DefaultProfileAvatar}
									/>
								)}
							</ListItemPrefix>
							<div>
								{user.username && (
									<Typography
										variant="h6"
										className={`${
											theme !== 'dark'
												? 'text-blue-gray-900'
												: 'text-blue-gray-100'
										}`}
									>
										{user?.username}
									</Typography>
								)}
							</div>
							<ListItemSuffix>
								<Button
									size="sm"
									color="cyan"
									onClick={() => handleFollow(user.id)}
									className="px-2"
								>
									Follow
								</Button>
							</ListItemSuffix>
						</ListItem>
					))}
				</List>
			)}
		</Card>
	);
}
