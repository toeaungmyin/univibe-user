import {
	List,
	ListItem,
	ListItemSuffix,
	Chip,
	Card,
	ListItemPrefix,
	Switch,
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
import { ThemeContext } from '../../../ThemeContext';
import { useSelector } from 'react-redux';
export function LeftNavList() {
	const authUser = useSelector(state => state.authReducer.user);
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
							value='18'
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
				<ListItem>
					<ListItemPrefix>
						{theme === 'dark' ? (
							<MoonIcon className='w-5 h-5' />
						) : (
							<SunIcon className='w-5 h-5' />
						)}
					</ListItemPrefix>
					{theme === 'dark' ? 'Dark Theme' : 'White Theme'}
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
