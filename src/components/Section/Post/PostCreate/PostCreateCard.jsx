import {
	Avatar,
	Card,
	CardBody,
	IconButton,
	Textarea,
} from '@material-tailwind/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { PaperAirplaneIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { PostCreateForm } from './PostCreateForm';

const PostCreateCard = () => {
	const auth = useSelector(state => state.authReducer.user);

	// post dialog
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(cur => !cur);

	return (
		<>
			<Card className="p-0 px-4">
				<CardBody className="flex justify-center items-center gap-2 p-2">
					<div className="min-w-[3rem] flex justify-center items-end">
						<Avatar
							withBorder
							className="p-0.5 object-cover"
							variant="circular"
							alt="candice"
							color="cyan"
							src={auth.profile_url}
						/>
					</div>
					<Textarea
						onClick={handleOpen}
						rows={1}
						placeholder="What about today?"
						className="min-h-full !border-0 focus:border-transparent mt-1"
						containerProps={{
							className: 'grid h-full',
						}}
						labelProps={{
							className: 'before:content-none after:content-none',
						}}
					/>
					<IconButton
						variant="text"
						color="cyan"
						className="p-1"
					>
						<PaperAirplaneIcon className="w-6 h-6" />
					</IconButton>
					<IconButton
						variant="text"
						color="cyan"
						className="p-1"
					>
						<PhotoIcon className="w-6 h-6" />
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
