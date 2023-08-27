import React, { useEffect } from 'react';
import {
	Navbar,
	Typography,
	Input,
	Tabs,
	TabsHeader,
	Tab,
} from '@material-tailwind/react';
import { useContext } from 'react';
import TextLogo from './../../assets/logo/logo-02.svg';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
	HomeIcon,
	BellIcon,
	ChatBubbleBottomCenterIcon,
} from '@heroicons/react/24/solid';
import ProfileMenu from './ProfileMenu';
import { ThemeContext } from '../../ThemeContext';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';

const route = {
	home: '/',
	notification: '/notification',
	message: '/message',
};

export function Header() {
	const { theme } = useContext(ThemeContext);
	const authUser = useSelector(state => state.authReducer.user);

	const location = useLocation();
	console.log(location);
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
		<Navbar
			fullWidth
			variant='filled'
			blurred={false}
			className={`mx-auto max-w-full py-2 px-4 lg:px-8 lg:py-2 rounded-none ${
				theme !== 'dark'
					? 'text-0 '
					: 'text-white bg-gray-900 border-none border-b-4'
			}`}>
			<div className={`flex items-center justify-between`}>
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
				<div className='flex gap-2'>
					<div className='w-72 hidden sm:block'>
						<Input
							label='Search'
							icon={<MagnifyingGlassIcon className='w-5 h-5' />}
							color='cyan'
						/>
					</div>
					<ProfileMenu authUser={authUser} />
				</div>
			</div>
			<Tabs
				value={activeTab}
				className=' md:hidden'>
				<TabsHeader
					className='rounded-none bg-transparent p-0'
					indicatorProps={{
						className: 'bg-transparent shadow-none rounded-none',
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
						value='/chat'
						onClick={() => handleTab('/chat')}>
						<ChatBubbleBottomCenterIcon
							className={`w-6 h-6 ${
								activeTab === '/chat'
									? activeTabClasses
									: noActiveTabClasses
							}`}
						/>
					</Tab>
				</TabsHeader>
			</Tabs>
		</Navbar>
	);
}
