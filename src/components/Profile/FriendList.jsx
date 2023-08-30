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
import { ThemeContext } from '../../ThemeContext/ThemeContext';
import { useNavigate } from 'react-router';
import { DefaultProfileAvatar } from '../../assets/images';

export function FriendList() {
	const selectedUser = useSelector(state => state.userReducer.selectedUser);
	const { theme } = useContext(ThemeContext);
	const navigate = useNavigate();

	const [allFriends, setAllFriends] = useState(false);
	const [allFollowers, setAllFollowers] = useState(false);
	const [allFollowings, setAllFollowings] = useState(false);

	return (
		<div className='flex flex-col gap-4 mt-2 max-h-[calc(100%-0.5rem)] overflow-auto no-scrollbar'>
			{selectedUser?.friends && selectedUser?.friends?.length !== 0 && (
				<Card
					className={`w-full rounded-none border-none md:rounded-lg ${
						theme !== 'dark' ? 'bg-white' : 'bg-gray-900'
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
						{selectedUser?.friends
							.slice(
								0,
								allFriends ? selectedUser.friends.length : 3
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
										{user?.profile_url ? (
											<Avatar
												withBorder
												className='p-0.5'
												variant='circular'
												alt='candice'
												onError={e =>
													(e.target.src =
														DefaultProfileAvatar)
												}
												src={user?.profile_url}
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
						{selectedUser?.friends?.length > 3 && (
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
			{selectedUser?.followings &&
				selectedUser?.followings?.length !== 0 && (
					<Card
						className={`w-full border-none rounded-none md:rounded-lg ${
							theme !== 'dark' ? 'bg-white' : 'bg-gray-900'
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
							{selectedUser?.followings
								.slice(
									0,
									allFollowings
										? selectedUser.followings.length
										: 3
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
											{user?.profile_url ? (
												<Avatar
													withBorder
													className='p-0.5'
													variant='circular'
													alt='candice'
													onError={e =>
														(e.target.src =
															DefaultProfileAvatar)
													}
													src={user?.profile_url}
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
							{selectedUser?.followers?.length > 3 && (
								<Chip
									variant='ghost'
									color='cyan'
									className={
										theme !== 'dark'
											? '[&>span]:text-cyan-900'
											: '[&>span]:text-cyan-50'
									}
									value='see more'
									onClick={() =>
										setAllFollowings(pre => !pre)
									}
								/>
							)}
						</CardFooter>
					</Card>
				)}
			{selectedUser?.followers &&
				selectedUser?.followers?.length !== 0 && (
					<Card
						className={`w-full border-none rounded-none md:rounded-lg ${
							theme !== 'dark' ? 'bg-white' : 'bg-gray-900'
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
								Followers
							</Typography>
						</CardHeader>
						<List>
							{selectedUser?.followers
								.slice(
									0,
									allFollowers
										? selectedUser.followers.length
										: 3
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
											{user?.profile_url ? (
												<Avatar
													withBorder
													className='p-0.5'
													variant='circular'
													alt='candice'
													onError={e =>
														(e.target.src =
															DefaultProfileAvatar)
													}
													src={user?.profile_url}
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
							{selectedUser?.followers?.length > 3 && (
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
