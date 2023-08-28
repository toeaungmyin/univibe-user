import {
	List,
	ListItem,
	ListItemSuffix,
	Chip,
	Card,
	ListItemPrefix,
	Switch,
	Typography,
} from '@material-tailwind/react';
import {
	HomeIcon,
	UserCircleIcon,
	BellIcon,
	ChatBubbleOvalLeftIcon,
	MoonIcon,
	SunIcon,
} from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { ThemeContext } from '../../../ThemeContext/ThemeContext';
import { useSelector } from 'react-redux';
export function LeftNavList() {
	const authUser = useSelector(state => state.authReducer.user);
	const notifications = useSelector(state => state.authReducer.notifications);

	const navigate = useNavigate();
	const { theme, toggleTheme } = useContext(ThemeContext);
	const handleTheme = () => {
		toggleTheme();
	};
	return (
		<Card
			className={`w-full ${
				theme !== 'dark' ? 'bg-white' : 'bg-gray-900'
			}`}>
			<List
				className={
					theme !== 'dark'
						? 'text-blue-gray-900'
						: 'text-blue-gray-50'
				}>
				<ListItem onClick={() => navigate('/')}>
					<ListItemPrefix>
						<HomeIcon className='w-5 h-5' />
					</ListItemPrefix>
					Home
				</ListItem>
				<ListItem onClick={() => navigate(`/profile/${authUser.id}`)}>
					<ListItemPrefix>
						<UserCircleIcon className='w-5 h-5' />
					</ListItemPrefix>
					Profile
				</ListItem>
				<ListItem onClick={() => navigate('/notifications')}>
					<ListItemPrefix>
						<BellIcon className='w-5 h-5' />
					</ListItemPrefix>
					Notifications
					<ListItemSuffix>
						<Chip
							color='cyan'
							value={notifications?.length}
							variant='ghost'
							size='sm'
							className='rounded-full'
						/>
					</ListItemSuffix>
				</ListItem>
				<ListItem onClick={() => navigate('/chat')}>
					<ListItemPrefix>
						<ChatBubbleOvalLeftIcon className='w-5 h-5' />
					</ListItemPrefix>
					Chat
					<ListItemSuffix>
						<Chip
							color='cyan'
							value='40'
							variant='ghost'
							size='sm'
							className='rounded-full'
						/>
					</ListItemSuffix>
				</ListItem>
				<ListItem
					className={
						theme !== 'dark'
							? 'bg-white hover:bg-white focus:bg-white'
							: 'bg-gray-900 hover:bg-gray-900 focus:bg-gray-900'
					}>
					<ListItemPrefix>
						{theme === 'dark' ? (
							<MoonIcon
								color='white'
								className='w-5 h-5'
							/>
						) : (
							<SunIcon
								color='black'
								className='w-5 h-5'
							/>
						)}
					</ListItemPrefix>
					<Typography
						variant='h6'
						color={theme !== 'dark' ? 'blue-gray' : 'white'}
						className='font-medium'>
						{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
					</Typography>
					<ListItemSuffix>
						<Switch
							color='cyan'
							onChange={handleTheme}
							checked={theme === 'dark' ? true : false}
						/>
					</ListItemSuffix>
				</ListItem>
			</List>
		</Card>
	);
}
