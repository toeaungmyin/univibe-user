import React, { useContext, useEffect, useState } from 'react';
import { searchUserRequest } from '../../service/User';
import {
	Avatar,
	Card,
	Input,
	List,
	ListItem,
	ListItemPrefix,
	Typography,
} from '@material-tailwind/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { DefaultProfileAvatar } from '../../assets/images';
import { ThemeContext } from '../../ThemeContext/ThemeContext';
import { useNavigate } from 'react-router';
import ProfileMenu from './ProfileMenu';

const SearchUser = () => {
	const { theme } = useContext(ThemeContext);

	const [open, setOpen] = React.useState(false);
	const [result, setResult] = React.useState([]);
	const navigate = useNavigate();
	const handleSearchUser = key => {
		key !== '' && handleSearch(key);
	};
	const handleSearch = async key => {
		try {
			const response = await searchUserRequest(key);
			if (response.status === 200) {
				setOpen(true);
				if (response.data.users !== undefined) {
					setResult(response.data.users);
				} else {
					setResult([]);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleResultClick = user => {
		navigate(`/profile/${user?.id}`);
		setOpen(false);
	};

	const [expand, setExpand] = useState(false);

	useEffect(() => {
		// Define a media query for screens with a max width of 960px
		const mediaQuery = window.matchMedia('(max-width: 960px)');

		// Initial check and set state based on the media query
		setExpand(mediaQuery.matches);

		// Add a listener for changes to the media query
		const mediaQueryListener = event => {
			setExpand(event.matches);
		};

		// Add the listener to the media query
		mediaQuery.addListener(mediaQueryListener);

		// Clean up the listener when the component unmounts
		return () => {
			mediaQuery.removeListener(mediaQueryListener);
		};
	}, []);

	return (
		<>
			<div className='relative'>
				<div className='w-80 hidden md:flex gap-2'>
					<Input
						label='Search'
						variant={expand ? 'standard' : 'outlined'}
						onChange={e => handleSearchUser(e.target.value)}
						icon={<MagnifyingGlassIcon className='w-5 h-5' />}
						color='cyan'
						style={{ zIndex: 9999 }}
					/>
					<ProfileMenu />
				</div>
				{open && (
					<Card
						className={`!absolute border top-[3.5rem] z-50 rounded py-2 ${
							theme !== 'dark'
								? 'bg-white border-blue-gray-300'
								: 'bg-gray-900 border-blue-gray-900'
						}`}>
						<List className='w-72 max-h-96 overflow-auto'>
							{result.length !== 0 ? (
								result.map((user, index) => (
									<ListItem
										key={index}
										onClick={() => handleResultClick(user)}>
										<ListItemPrefix>
											{user?.profile_url ? (
												<Avatar
													variant='circular'
													size='sm'
													color='cyan'
													withBorder={user?.online}
													className={
														user?.online
															? 'p-0.5'
															: 'p-0'
													}
													alt='candice'
													onError={e =>
														(e.target.src =
															DefaultProfileAvatar)
													}
													src={user?.profile_url}
												/>
											) : (
												<Avatar
													variant='circular'
													size='sm'
													color='cyan'
													withBorder={user?.online}
													className={
														user?.online
															? 'p-0.5'
															: 'p-0'
													}
													alt='candice'
													src={DefaultProfileAvatar}
												/>
											)}
										</ListItemPrefix>
										{user?.username && (
											<Typography
												variant='h6'
												className='font-medium'
												color={
													theme !== 'dark'
														? 'blue-gray'
														: 'white'
												}>
												{user?.username}
											</Typography>
										)}
									</ListItem>
								))
							) : (
								<Typography
									variant='h6'
									className={`font-medium text-center ${
										theme !== 'dark'
											? 'text-blue-gray-700'
											: 'text-white'
									}`}>
									Result Not Found
								</Typography>
							)}
						</List>
					</Card>
				)}
			</div>
			{open && (
				<div
					className='!absolute top-[4.5rem] left-0 bg-black/30 w-screen h-screen'
					onClick={() => {
						setOpen(false);
					}}></div>
			)}
		</>
	);
};

export default SearchUser;
