import { Avatar, Typography } from '@material-tailwind/react';
import React, { useContext } from 'react';
import { ThemeContext } from '../../../ThemeContext/ThemeContext';
import { DefaultProfileAvatar } from '../../../assets/images';

const Message = () => {
	// const authUser = useSelector(state => state.authReducer.user);
	const { theme } = useContext(ThemeContext);
	return (
		<div className={`flex gap-2`}>
			<div className='min-w-[2.5rem]'>
				<Avatar
					withBorder
					size='sm'
					className='p-0.5'
					variant='circular'
					alt='candice'
					color='cyan'
					onError={e => (e.target.src = DefaultProfileAvatar)}
					// src={comment?.user?.profile_url}
					src={DefaultProfileAvatar}
				/>
			</div>
			<div className='flex flex-col items-end'>
				<div
					className={`border ${
						theme !== 'dark'
							? 'border-blue-gray-100 bg-blue-gray-50'
							: 'border-gray-800 bg-gray-800'
					}  p-2 rounded-lg `}>
					<Typography
						variant='small'
						className='text-sm font-medium'
						color={theme !== 'dark' ? 'blue-gray' : 'white'}>
						How are You
					</Typography>
				</div>
				<Typography
					variant='small'
					className='text-xs font-medium'
					color={theme !== 'dark' ? 'blue-gray' : 'white'}>
					1 min ago
				</Typography>
			</div>
		</div>
	);
};

export default Message;
