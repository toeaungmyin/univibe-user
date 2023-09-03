import {
	Avatar,
	Card,
	CardBody,
	IconButton,
	Textarea,
} from '@material-tailwind/react';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { PaperAirplaneIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { PostCreateForm } from './PostCreateForm';
import { ThemeContext } from '../../../../ThemeContext/ThemeContext';
import { DefaultProfileAvatar } from '../../../../assets/images';

const PostCreateCard = () => {
	const { theme } = useContext(ThemeContext);

	const auth = useSelector(state => state.authReducer.user);

	// post dialog
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(cur => !cur);

	return (
		<>
			<Card
				className={`p-0 px-4 rounded-none md:rounded-md ${
					theme !== 'dark' ? 'bg-white' : 'bg-gray-900'
				}`}>
				<CardBody className='flex justify-center items-center gap-2 p-2 px-1'>
					<div className='min-w-[3rem] flex justify-center items-end'>
						<Avatar
							withBorder={auth?.online}
							className={`object-cover ${
								auth?.online ? 'p-0.5' : 'p-0'
							}`}
							variant='circular'
							alt='candice'
							color='cyan'
							onError={e => (e.target.src = DefaultProfileAvatar)}
							src={auth?.profile_url}
						/>
					</div>
					<Textarea
						onClick={handleOpen}
						rows={1}
						name='temp'
						placeholder='What about today?'
						className='min-h-full !border-0 focus:border-transparent mt-1'
						containerProps={{
							className: 'grid h-full',
						}}
						labelProps={{
							className: 'before:content-none after:content-none',
						}}
					/>
					<IconButton
						onClick={handleOpen}
						variant='text'
						color='cyan'
						className='p-1'>
						<PhotoIcon className='w-6 h-6' />
					</IconButton>
				</CardBody>
			</Card>
			<PostCreateForm
				open={open}
				handleOpen={handleOpen}
			/>
		</>
	);
};

export default PostCreateCard;
