import React, { useContext, useState } from 'react';
import {
	Drawer,
	Typography,
	IconButton,
	Avatar,
	List,
	ListItemPrefix,
	ListItem,
	ListItemSuffix,
	Switch,
} from '@material-tailwind/react';
import {
	MoonIcon,
	SunIcon,
	ChevronLeftIcon,
	UserCircleIcon,
} from '@heroicons/react/24/solid';
import { FaPowerOff } from 'react-icons/fa6';
import { MenuContext } from '../../ThemeContext/MenuContext';
import { ThemeContext } from '../../ThemeContext/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultProfileAvatar } from '../../assets/images';
import { logoutRequest } from '../../service/Auth';
import { logout } from '../../features/auth/AuthSlice';
import DialogModel from '../DIalogModel/DialogModel';
import { useNavigate } from 'react-router';

export function SidebarMenu() {
	const { isMenuOpen, closeMenu } = useContext(MenuContext);
	const authUser = useSelector(state => state.authReducer.user);
	const { theme, toggleTheme } = useContext(ThemeContext);
	const handleTheme = () => {
		toggleTheme();
	};
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [isDialoagOpen, setDialoag] = useState(false);

	const openLogoutDialoag = () => setDialoag(true);
	const closeLogoutDialoag = () => setDialoag(false);

	const handleLogout = async () => {
		closeLogoutDialoag();
		dispatch(logout());
		const response = await logoutRequest()
			.then(res => res)
			.catch(error => error.response);
		if (response.status === 200) {
			localStorage.removeItem('user-token');
			navigate('/sign-in');
		}
	};

	return (
		<>
			<Drawer
				open={isMenuOpen}
				onClose={closeMenu}
				className={`p-4 flex flex-col justify-between ${
					theme !== 'dark' ? 'bg-white' : 'bg-gray-900'
				}`}
				placement='right'>
				<div className='flex-col'>
					<div className='mb-6 flex gap-2 items-center justify-start'>
						<IconButton
							variant='text'
							color='blue-gray'
							onClick={closeMenu}>
							<ChevronLeftIcon
								color={theme !== 'dark' ? 'blue-gray' : 'white'}
								className='w-5 h-5'
							/>
						</IconButton>
						<Typography
							className='font-medium'
							variant='h5'
							color={theme !== 'dark' ? 'blue-gray' : 'white'}>
							Menu
						</Typography>
					</div>
					<List>
						<ListItem
							onClickCapture={() => {
								navigate(`/profile/${authUser?.id}`);
								closeMenu();
							}}>
							<ListItemPrefix>
								<UserCircleIcon
									color={
										theme !== 'dark' ? 'blue-gray' : 'white'
									}
									className='w-5 h-5'
								/>
							</ListItemPrefix>
							{authUser?.username && (
								<Typography
									className='font-medium'
									variant='h6'
									color={
										theme !== 'dark' ? 'blue-gray' : 'white'
									}>
									{authUser?.username}
								</Typography>
							)}
							<ListItemSuffix>
								{authUser?.profile_url ? (
									<Avatar
										color='cyan'
										withBorder={authUser?.online}
										className={`${
											authUser?.online ? 'p-0.5' : 'p-0'
										}`}
										variant='circular'
										size='sm'
										alt='tania andrew'
										onError={e =>
											(e.target.src =
												DefaultProfileAvatar)
										}
										src={authUser?.profile_url}
									/>
								) : (
									<Avatar
										color='cyan'
										withBorder={authUser?.online}
										className={`${
											authUser?.online ? 'p-0.5' : 'p-0'
										}`}
										variant='circular'
										size='sm'
										alt='tania andrew'
										src={DefaultProfileAvatar}
									/>
								)}
							</ListItemSuffix>
						</ListItem>
						<ListItem>
							<ListItemPrefix>
								{theme === 'dark' ? (
									<MoonIcon
										color={
											theme !== 'dark'
												? 'blue-gray'
												: 'white'
										}
										className='w-5 h-5'
									/>
								) : (
									<SunIcon
										color={
											theme !== 'dark'
												? 'blue-gray'
												: 'white'
										}
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
				</div>

				<List>
					<ListItem onClick={() => openLogoutDialoag()}>
						<ListItemPrefix>
							<FaPowerOff
								color={theme !== 'dark' ? 'blue-gray' : 'white'}
								className='w-5 h-5'
							/>
						</ListItemPrefix>
						<Typography
							variant='h6'
							className='font-medium'
							color={theme !== 'dark' ? 'blue-gray' : 'white'}>
							Log Out
						</Typography>
					</ListItem>
				</List>
			</Drawer>
			<DialogModel
				isDialoagOpen={isDialoagOpen}
				closeLogoutDialoag={closeLogoutDialoag}
				handleLogout={handleLogout}
			/>
		</>
	);
}
