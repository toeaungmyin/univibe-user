import React from 'react';
import {
	Navbar,
	Typography,
	Tabs,
	TabsHeader,
	Tab,
	IconButton,
} from '@material-tailwind/react';
import { useContext } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid';
import TextLogo from './../../assets/logo/logo-02.svg';
import {
	HomeIcon,
	BellIcon,
	UsersIcon,
	UserCircleIcon,
	Bars3Icon,
} from '@heroicons/react/24/solid';
import { ThemeContext } from '../../ThemeContext/ThemeContext';
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import { MenuContext } from '../../ThemeContext/MenuContext';
import SearchUser from './SearchUser';

export function Header() {
	const { theme } = useContext(ThemeContext);
	const { openMenu } = useContext(MenuContext);
	const authUser = useSelector(state => state.authReducer.user);

	const location = useLocation();
	const [activeTab, setActiveTab] = React.useState(location.pathname);
	const handleTab = route => {
		navigate(route);
		setActiveTab(route);
	};
	const navigate = useNavigate();
	const activeTabClasses = 'text-cyan-500';
	const noActiveTabClasses =
		theme !== 'dark' ? 'text-blue-gray-900' : 'text-blue-gray-500';

	return (
		<>
			<Navbar
				fullWidth
				variant='filled'
				blurred={false}
				className={`mx-auto max-w-full py-2 px-4 lg:px-8 lg:py-2 rounded-none ${
					theme !== 'dark'
						? 'text-0 '
						: 'text-white bg-gray-900 border-none border-b-4'
				}`}>
				<div
					className={`min-h-[3.5rem] flex items-center justify-between`}>
					<div className='flex justify-center items-center gap-2'>
						<img
							className='w-14 transition duration-150 object-contain'
							width={'100%'}
							height={'100%'}
							src={TextLogo}
							alt='logo'
						/>
						<Typography
							variant='h1'
							className='suezOne text-cyan-700 tracking-wider text-2xl'>
							UniVibe
						</Typography>
					</div>

					<SearchUser />

					<div className='flex gap-2 md:hidden'>
						<IconButton
							onClick={() => navigate('/search')}
							variant='filled'
							className='block md:hidden text-black bg-gray-900/10 rounded-full shadow-none'>
							<MagnifyingGlassIcon className='w-5 h-5' />
						</IconButton>
						<IconButton
							onClick={() => navigate('/chats')}
							variant='filled'
							className='block md:hidden text-cyan-500 bg-blue-500/10 rounded-full shadow-none'>
							<ChatBubbleOvalLeftIcon className='w-5 h-5' />
						</IconButton>
					</div>
				</div>
				<Tabs
					value={activeTab}
					className=' md:hidden'>
					<TabsHeader
						className='rounded-none bg-transparent p-0'
						indicatorProps={{
							className:
								'bg-transparent shadow-none rounded-none',
						}}>
						<Tab
							value='/'
							onClick={() => {
								handleTab('/');
							}}>
							<HomeIcon
								className={`w-6 h-6 ${
									activeTab === '/'
										? activeTabClasses
										: noActiveTabClasses
								}`}
							/>
						</Tab>
						<Tab
							value='/friends'
							onClick={() => handleTab('/friends')}>
							<UsersIcon
								className={`w-6 h-6 ${
									activeTab === '/friends'
										? activeTabClasses
										: noActiveTabClasses
								}`}
							/>
						</Tab>
						<Tab
							value='/notifications'
							onClick={() => handleTab('/notifications')}>
							<BellIcon
								className={`w-6 h-6 ${
									activeTab === '/notifications'
										? activeTabClasses
										: noActiveTabClasses
								}`}
							/>
						</Tab>
						<Tab
							value={`/profile/${authUser?.id}`}
							onClick={() =>
								handleTab(`/profile/${authUser?.id}`)
							}>
							<UserCircleIcon
								className={`w-6 h-6 ${
									activeTab === `/profile/${authUser?.id}`
										? activeTabClasses
										: noActiveTabClasses
								}`}
							/>
						</Tab>
						<Tab
							color='blue-gray'
							value=''
							onClick={openMenu}>
							<Bars3Icon
								className={`w-6 h-6 ${noActiveTabClasses}`}
							/>
						</Tab>
					</TabsHeader>
				</Tabs>
			</Navbar>
		</>
	);
}
