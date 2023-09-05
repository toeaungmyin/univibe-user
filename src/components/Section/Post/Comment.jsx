import { Avatar, Button, Spinner, Typography } from '@material-tailwind/react';
import React, { useContext } from 'react';
import { ThemeContext } from '../../../ThemeContext/ThemeContext';
import { DefaultProfileAvatar } from '../../../assets/images';
import { useSelector } from 'react-redux';

const Comment = ({ comment, deleteComment, isDeletingComment }) => {
	const authUser = useSelector(state => state.authReducer.user);
	const { theme } = useContext(ThemeContext);

	return (
		<div className={`flex gap-2`}>
			<div className='min-w-[2.5rem]'>
				<Avatar
					withBorder={comment?.user?.online}
					className={comment?.user?.online ? 'p-0.5' : 'p-0'}
					size='sm'
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
								className='text-sm font-semibold'
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
				<div className='flex gap-2'>
					<Typography
						variant='small'
						className='text-xs font-medium'
						color={theme !== 'dark' ? 'blue-gray' : 'white'}>
						{comment?.created_at}
					</Typography>
					{authUser?.id === comment.user.id && (
						<Button
							className='p-0 text-xs font-medium lowercase'
							color='blue-gray'
							variant='text'
							onClick={() => deleteComment(comment?.id)}>
							{isDeletingComment === comment.id ? (
								<Spinner className='w-3 h-3' />
							) : (
								'delete'
							)}
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Comment;
