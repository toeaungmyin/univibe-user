import {
	List,
	ListItem,
	ListItemPrefix,
	Avatar,
	Card,
	Typography,
	Button,
	ListItemSuffix,
	CardHeader,
} from '@material-tailwind/react';
import { useContext } from 'react';
import { ThemeContext } from '../../../ThemeContext';
import { useSelector } from 'react-redux';
import { followRequest } from '../../../service/Follow';
import { DefaultProfileAvatar } from '../../../assets/images';

export function Followback() {
	const { theme } = useContext(ThemeContext);
	const authUser = useSelector(state => state.authReducer.user);
	const followers = authUser?.followers;

	const handleFollow = async userId => {
		try {
			const response = await followRequest(userId);
			if (response.status === 200) {
				console.log(response);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{followers.length !== 0 && (
				<Card
					className="w-full"
					shadow={false}
					color="transparent"
				>
					<CardHeader
						floated={false}
						shadow={false}
						className="mx-0 mt-0 mb-2 rounded-none"
						color="transparent"
					>
						<Typography
							variant="h6"
							className={`${
								theme !== 'dark' ? 'text-blue-gray-900' : 'text-blue-gray-500'
							}`}
						>
							People who followed you
						</Typography>
					</CardHeader>
					<List className="p-0 gap-4">
						{followers?.map((follower, index) => (
							<ListItem
								key={index}
								className={
									theme !== 'dark'
										? 'bg-white shadow hover:bg-white focus:bg-white'
										: 'bg-gray-900 shadow hover:bg-gray-900 focus:bg-gray-900'
								}
								ripple={false}
							>
								<ListItemPrefix className="flex gap-2">
									{follower?.profile_url ? (
										<Avatar
											variant="circular"
											size="sm"
											withBorder
											className="p-0.5"
											alt="candice"
											onError={e => (e.target.src = DefaultProfileAvatar)}
											src={follower?.profile_url}
										/>
									) : (
										<Avatar
											variant="circular"
											size="sm"
											withBorder
											className="p-0.5"
											alt="candice"
											src={DefaultProfileAvatar}
										/>
									)}
								</ListItemPrefix>
								<div>
									{follower?.username && (
										<Typography
											variant="h6"
											className="font-medium"
											color={theme !== 'dark' ? 'blue-gray' : 'white'}
										>
											{follower?.username}
										</Typography>
									)}
								</div>
								<ListItemSuffix>
									<Button
										onClick={() => handleFollow(follower.id)}
										size="sm"
										color="cyan"
										className="hover:shadow-none px-2"
									>
										Follow Back
									</Button>
								</ListItemSuffix>
							</ListItem>
						))}
					</List>
				</Card>
			)}
		</>
	);
}
