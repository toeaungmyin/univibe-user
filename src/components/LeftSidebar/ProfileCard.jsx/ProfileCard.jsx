import { Card, CardHeader, Typography, Avatar } from '@material-tailwind/react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../../../ThemeContext/ThemeContext';
import { DefaultProfileAvatar } from '../../../assets/images';
import { useNavigate } from 'react-router';

export function ProfileCard() {
	const authUser = useSelector(state => state.authReducer.user);
	const { theme } = useContext(ThemeContext);
	const navigate = useNavigate();
	return (
		<Card
			className={`w-full rounded-md flex justify-start items-center p-4 ${
				theme !== 'dark' ? 'bg-white' : 'bg-gray-900'
			}`}>
			<CardHeader
				color='transparent'
				floated={false}
				shadow={false}
				className='flex justify-center items-center gap-2 m-0 rounded-none'
				onClick={() => navigate(`/profile/${authUser?.id}`)}>
				<div className='min-w-[3rem] flex justify-center items-end'>
					<Avatar
						color='cyan'
						withBorder={authUser?.online}
						className={authUser?.online ? 'p-0.5' : 'p-0'}
						variant='circular'
						alt='candice'
						onError={e => (e.target.src = DefaultProfileAvatar)}
						src={authUser?.profile_url || DefaultProfileAvatar}
					/>
				</div>
				<div className='flex w-full flex-col gap-0.5'>
					{authUser?.username && (
						<Typography
							variant='h5'
							color={`${
								theme !== 'dark' ? 'blue-gray' : 'white'
							}`}>
							{authUser.username}
						</Typography>
					)}
				</div>
			</CardHeader>
		</Card>
	);
}
