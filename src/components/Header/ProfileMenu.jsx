import {
	Avatar,
	Button,
	Menu,
	MenuHandler,
	MenuItem,
	MenuList,
	Typography,
} from '@material-tailwind/react';
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeContext } from '../../ThemeContext/ThemeContext';
import { DefaultProfileAvatar } from '../../assets/images';
import { ChevronDownIcon, PowerIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router';
import { logout } from '../../features/auth/AuthSlice';
import { logoutRequest } from '../../service/Auth';
import DialogModel from '../DIalogModel/DialogModel';

const ProfileMenu = () => {
	const { theme } = useContext(ThemeContext);
	const authUser = useSelector(state => state.authReducer.user);

	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	const closeMenu = () => setIsMenuOpen(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [isDialoagOpen, setDialoag] = useState(false);

	const openLogoutDialoag = () => setDialoag(true);
	const closeLogoutDialoag = () => setDialoag(false);

	const handleLogout = async () => {
		closeMenu();
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
		<Menu
			open={isMenuOpen}
			handler={setIsMenuOpen}
			placement='bottom-end'>
			<MenuHandler>
				<Button
					variant='text'
					color='blue-gray'
					className='min-w-[4rem] flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto'>
					{authUser?.profile_url ? (
						<Avatar
							variant='circular'
							size='sm'
							withBorder
							className='p-0.5'
							alt='candice'
							onError={e => (e.target.src = DefaultProfileAvatar)}
							src={authUser?.profile_url}
						/>
					) : (
						<Avatar
							variant='circular'
							size='sm'
							withBorder
							className='p-0.5'
							alt='candice'
							src={DefaultProfileAvatar}
						/>
					)}
					<ChevronDownIcon
						strokeWidth={2.5}
						className={`h-4 w-4 transition-transform ${
							isMenuOpen ? 'rotate-180' : ''
						}`}
					/>
				</Button>
			</MenuHandler>
			<MenuList className='p-1'>
				<MenuItem
					onClick={openLogoutDialoag}
					className={`flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'
							`}>
					<PowerIcon className='w-4 h-4 text-red-500' />
					<Typography
						as='span'
						variant='small'
						className='font-normal'
						color='red'>
						Sign Out
					</Typography>
				</MenuItem>
			</MenuList>
			<DialogModel
				isDialoagOpen={isDialoagOpen}
				closeLogoutDialoag={closeLogoutDialoag}
				handleLogout={handleLogout}
			/>
		</Menu>
	);
};

export default ProfileMenu;
