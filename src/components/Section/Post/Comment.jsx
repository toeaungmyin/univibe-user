import { Avatar, Typography } from '@material-tailwind/react';
import React, { useContext } from 'react';
import { ThemeContext } from '../../../ThemeContext';
import { DefaultProfileAvatar } from '../../../assets/images';
import { useSelector } from 'react-redux';

const Comment = ({ comment }) => {
	const authUser = useSelector(state => state.authReducer.user);
	const { theme } = useContext(ThemeContext);

	return (
		<div
			className={`flex gap-2 ${
				comment.user.id === authUser.id && 'flex-row-reverse'
			}`}>
			<div className='min-w-[2.5rem]'>
				<Avatar
					withBorder
					size='sm'
					className='p-0.5'
					variant='circular'
					alt='candice'
					color='cyan'
					onError={e => (e.target.src = DefaultProfileAvatar)}
					src={comment?.user?.profile_url}
				/>
			</div>
			<div className='flex flex-col items-end'>
				<div
					className={`border ${
						theme !== 'dark'
							? 'border-blue-gray-100 bg-blue-gray-50'
							: 'border-gray-800 bg-gray-800'
					}  p-2 rounded-lg `}>
					{comment?.description && (
						<>
							<Typography
								variant='small'
								className='text-sm font-medium'
								color={
									theme !== 'dark' ? 'blue-gray' : 'white'
								}>
								{comment?.user.username}
							</Typography>

							<Typography
								variant='small'
								className='text-sm font-normal'
								color={
									theme !== 'dark' ? 'blue-gray' : 'white'
								}>
								{comment?.description}
							</Typography>
						</>
					)}
				</div>
				<Typography
					variant='small'
					className='text-xs font-medium'
					color={theme !== 'dark' ? 'blue-gray' : 'white'}>
					{comment?.created_at}
				</Typography>
			</div>
		</div>
	);
};

export default Comment;
