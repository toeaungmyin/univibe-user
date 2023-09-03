import React, { useContext } from 'react';
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
import { useNavigate } from 'react-router';
import { ThemeContext } from '../../../ThemeContext/ThemeContext';
import { searchUserRequest } from '../../../service/User';
import { DefaultProfileAvatar } from '../../../assets/images';

const Search = () => {
	const { theme } = useContext(ThemeContext);
	const [result, setResult] = React.useState([]);
	const navigate = useNavigate();
	const handleSearchUser = key => {
		key !== '' && handleSearch(key);
	};
	const handleSearch = async key => {
		try {
			const response = await searchUserRequest(key);
			if (response.status === 200) {
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
	};

	return (
		<div className='mt-0'>
			<Card
				className={`w-full h-[calc(100%-7rem)] flex flex-col items-center rounded-none p-4 ${
					theme !== 'dark' ? 'bg-white' : 'bg-gray-900'
				}`}>
				<div className='w-full p-2'>
					<Input
						label='Search'
						variant='standard'
						onChange={e => handleSearchUser(e.target.value)}
						icon={<MagnifyingGlassIcon className='w-5 h-5' />}
						color='cyan'
						style={{ zIndex: 9999 }}
					/>
				</div>
				<List className='w-full'>
					{result.length !== 0 &&
						result.map((user, index) => (
							<ListItem
								className='shadow rounded-none'
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
												user?.online ? 'p-0.5' : 'p-0'
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
												user?.online ? 'p-0.5' : 'p-0'
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
						))}
				</List>
			</Card>
		</div>
	);
};

export default Search;
