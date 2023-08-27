import { Card, CardHeader, Typography, Avatar } from '@material-tailwind/react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../../../ThemeContext';
import { DefaultProfileAvatar } from '../../../assets/images';
import { useNavigate } from 'react-router';

export function ProfileCard() {
	const authUser = useSelector(state => state.authReducer.user);
	const { theme } = useContext(ThemeContext);
	const navigate = useNavigate();
	return (
		<Card
			className={`w-full flex justify-start items-center p-4 ${
				theme !== 'dark' ? 'bg-white' : 'bg-gray-900'
			}`}>
			<CardHeader
				color='transparent'
				floated={false}
				shadow={false}
				className='flex justify-center items-center gap-6 m-0 rounded-none'
				onClick={() => navigate(`/profile/${authUser?.id}`)}>
				<div className='min-w-[3rem] flex justify-center items-end'>
					<Avatar
						withBorder
						className='p-0.5 object-cover'
						variant='circular'
						alt='candice'
						color='cyan'
						onError={e => (e.target.src = DefaultProfileAvatar)}
						src={authUser?.profile_url}
					/>
				</div>
				<div className='flex w-full flex-col gap-0.5'>
					{authUser?.username && (
						<Typography
							variant='h6'
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
