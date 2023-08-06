import {
	UserCircleIcon,
	ChevronDownIcon,
	PowerIcon,
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/AuthSlice';
import { logoutRequest } from '../../server/Auth';
import DialogModel from '../DIalogModel/DialogModel';
import {
	Avatar,
	Button,
	Menu,
	MenuHandler,
	MenuItem,
	MenuList,
	Typography,
} from '@material-tailwind/react';

const ProfileMeu = ({ authUser }) => {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const closeMenu = () => setIsMenuOpen(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleNavigate = routeName => {
		navigate(routeName);
		if (closeMenu) {
			closeMenu();
		}
	};

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
			navigate('sign-in');
		}
	};

	return (
		<Menu
			open={isMenuOpen}
			handler={setIsMenuOpen}
			placement="bottom-end"
		>
			<MenuHandler>
				<Button
					variant="text"
					color="blue-gray"
					className="flex items-center gap-2 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
				>
					{authUser?.username && (
						<Typography
							variant="h6"
							className="text-sm font-medium ps-2 hidden sm:inline-block"
						>
							{authUser.username}
						</Typography>
					)}
					<Avatar
						variant="circular"
						size="sm"
						alt="tania andrew"
						className="border border-blue-500 p-0.5"
						src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
					/>
					<ChevronDownIcon
						strokeWidth={2.5}
						className={`h-3 w-3 transition-transform ${
							isMenuOpen ? 'rotate-180' : ''
						}`}
					/>
				</Button>
			</MenuHandler>
			<MenuList className="p-1">
				<MenuItem
					onClick={() => {
						handleNavigate('/me');
					}}
					className={`flex items-center gap-2 rounded`}
				>
					<UserCircleIcon className="w-5 h-5" />
					<Typography
						as="span"
						variant="small"
						className="font-normal"
					>
						Profile
					</Typography>
				</MenuItem>
				<MenuItem
					onClick={() => openLogoutDialoag()}
					className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
				>
					<PowerIcon className="w-5 h-5 text-red-500" />
					<Typography
						as="span"
						variant="small"
						className="font-normal"
						color="red"
					>
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

export default ProfileMeu;
