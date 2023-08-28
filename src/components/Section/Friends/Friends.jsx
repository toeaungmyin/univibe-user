import {
	List,
	ListItem,
	ListItemPrefix,
	Avatar,
	Card,
	Typography,
	CardHeader,
	CardFooter,
	Chip,
} from '@material-tailwind/react';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ThemeContext } from '../../../ThemeContext/ThemeContext';
import { DefaultProfileAvatar } from '../../../assets/images';

export function Friends() {
	const authUser = useSelector(state => state.authReducer.user);
	const { theme } = useContext(ThemeContext);
	const navigate = useNavigate();
	console.log(authUser);
	const [allFriends, setAllFriends] = useState(false);
	const [allFollowers, setAllFollowers] = useState(false);
	const [allFollowings, setAllFollowings] = useState(false);

	return (
		<div className='flex flex-col mt-2 max-h-[calc(100%-0.5rem)] overflow-auto no-scrollbar'>
			{authUser?.friends && authUser?.friends?.length !== 0 && (
				<Card
					className={`w-full border-b-2 rounded-none md:rounded-lg ${
						theme !== 'dark'
							? 'bg-white'
							: 'bg-gray-900 border-blue-gray-800'
					}`}>
					<CardHeader
						color='transparent'
						className={`${
							theme !== 'dark'
								? 'text-blue-gray-900'
								: 'text-blue-gray-100'
						}`}
						floated={false}
						shadow={false}>
						<Typography
							variant='h6'
							className={`${
								theme !== 'dark'
									? 'text-blue-gray-900'
									: 'text-blue-gray-100'
							}`}>
							Friends
						</Typography>
					</CardHeader>
					<List>
						{authUser?.friends
							.slice(0, allFriends ? authUser.friends.length : 3)
							.map((user, index) => (
								<ListItem
									onClick={() =>
										navigate(`/profile/${user?.id}`)
									}
									key={index}
									className={`p-2 ${
										theme !== 'dark'
											? 'bg-white hover:bg-white focus:bg-white'
											: 'bg-gray-900 hover:bg-gray-900 focus:bg-gray-900'
									}`}
									ripple={false}>
									<ListItemPrefix>
										{user?.porfile_url ? (
											<Avatar
												withBorder
												className='p-0.5'
												variant='circular'
												alt='candice'
												src={user?.porfile_url}
											/>
										) : (
											<Avatar
												withBorder
												className='p-0.5'
												variant='circular'
												alt='candice'
												src={DefaultProfileAvatar}
											/>
										)}
									</ListItemPrefix>
									<div>
										{user.username && (
											<Typography
												variant='h6'
												className={`${
													theme !== 'dark'
														? 'text-blue-gray-900'
														: 'text-blue-gray-100'
												}`}>
												{user?.username}
											</Typography>
										)}
									</div>
								</ListItem>
							))}
					</List>
					<CardFooter className='flex justify-center p-2'>
						{authUser.friends.length > 3 && (
							<Chip
								variant='ghost'
								color='cyan'
								className={
									theme !== 'dark'
										? '[&>span]:text-cyan-900'
										: '[&>span]:text-cyan-50'
								}
								value='see more'
								onClick={() => setAllFriends(pre => !pre)}
							/>
						)}
					</CardFooter>
				</Card>
			)}
			{authUser?.followings && authUser?.followings?.length !== 0 && (
				<Card
					className={`w-full border-b-2 rounded-none md:rounded-lg ${
						theme !== 'dark'
							? 'bg-white'
							: 'bg-gray-900 border-blue-gray-800'
					}`}>
					<CardHeader
						color='transparent'
						className={`${
							theme !== 'dark'
								? 'text-blue-gray-900'
								: 'text-blue-gray-100'
						}`}
						floated={false}
						shadow={false}>
						<Typography
							variant='h6'
							className={`${
								theme !== 'dark'
									? 'text-blue-gray-900'
									: 'text-blue-gray-100'
							}`}>
							Followings
						</Typography>
					</CardHeader>
					<List>
						{authUser?.followings
							.slice(
								0,
								allFollowings ? authUser.followings.length : 3
							)
							.map((user, index) => (
								<ListItem
									onClick={() =>
										navigate(`/profile/${user?.id}`)
									}
									key={index}
									className={`p-2 ${
										theme !== 'dark'
											? 'bg-white hover:bg-white focus:bg-white'
											: 'bg-gray-900 hover:bg-gray-900 focus:bg-gray-900'
									}`}
									ripple={false}>
									<ListItemPrefix>
										{user?.porfile_url ? (
											<Avatar
												withBorder
												className='p-0.5'
												variant='circular'
												alt='candice'
												src={user?.porfile_url}
											/>
										) : (
											<Avatar
												withBorder
												className='p-0.5'
												variant='circular'
												alt='candice'
												src={DefaultProfileAvatar}
											/>
										)}
									</ListItemPrefix>
									<div>
										{user.username && (
											<Typography
												variant='h6'
												className={`${
													theme !== 'dark'
														? 'text-blue-gray-900'
														: 'text-blue-gray-100'
												}`}>
												{user?.username}
											</Typography>
										)}
									</div>
								</ListItem>
							))}
					</List>
					<CardFooter className='flex justify-center p-2'>
						{authUser.followings.length > 3 && (
							<Chip
								variant='ghost'
								color='cyan'
								className={
									theme !== 'dark'
										? '[&>span]:text-cyan-900'
										: '[&>span]:text-cyan-50'
								}
								value='see more'
								onClick={() => setAllFollowings(pre => !pre)}
							/>
						)}
					</CardFooter>
				</Card>
			)}
			{authUser?.followers && authUser?.followers?.length !== 0 && (
				<Card
					className={`w-full border-b-2 rounded-none md:rounded-lg ${
						theme !== 'dark'
							? 'bg-white'
							: 'bg-gray-900 border-blue-gray-800'
					}`}>
					<CardHeader
						color='transparent'
						className={`${
							theme !== 'dark'
								? 'text-blue-gray-900'
								: 'text-blue-gray-100'
						}`}
						floated={false}
						shadow={false}>
						<Typography
							variant='h6'
							className={`${
								theme !== 'dark'
									? 'text-blue-gray-900'
									: 'text-blue-gray-100'
							}`}>
							Followings
						</Typography>
					</CardHeader>
					<List>
						{authUser?.followers
							.slice(
								0,
								allFollowers ? authUser.followers.length : 3
							)
							.map((user, index) => (
								<ListItem
									onClick={() =>
										navigate(`/profile/${user?.id}`)
									}
									key={index}
									className={`p-2 ${
										theme !== 'dark'
											? 'bg-white hover:bg-white focus:bg-white'
											: 'bg-gray-900 hover:bg-gray-900 focus:bg-gray-900'
									}`}
									ripple={false}>
									<ListItemPrefix>
										{user?.porfile_url ? (
											<Avatar
												withBorder
												className='p-0.5'
												variant='circular'
												alt='candice'
												src={user?.porfile_url}
											/>
										) : (
											<Avatar
												withBorder
												className='p-0.5'
												variant='circular'
												alt='candice'
												src={DefaultProfileAvatar}
											/>
										)}
									</ListItemPrefix>
									<div>
										{user.username && (
											<Typography
												variant='h6'
												className={`${
													theme !== 'dark'
														? 'text-blue-gray-900'
														: 'text-blue-gray-100'
												}`}>
												{user?.username}
											</Typography>
										)}
									</div>
								</ListItem>
							))}
					</List>
					<CardFooter className='flex justify-center p-2'>
						{authUser.followers.length > 3 && (
							<Chip
								variant='ghost'
								color='cyan'
								className={
									theme !== 'dark'
										? '[&>span]:text-cyan-900'
										: '[&>span]:text-cyan-50'
								}
								value='see more'
								onClick={() => setAllFollowers(pre => !pre)}
							/>
						)}
					</CardFooter>
				</Card>
			)}
		</div>
	);
}
