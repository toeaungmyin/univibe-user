import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Avatar,
	IconButton,
} from '@material-tailwind/react';
import { motion } from 'framer-motion';
import { XMarkIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { HeartIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export function PostCard({ post }) {
	const [reaction, setReaction] = useState(false);

	const giveReaction = () => {
		setReaction(!reaction);
	};

	return (
		<Card className="w-full overflow-hidden rounded-none md:rounded-lg">
			<CardHeader
				floated={false}
				shadow={false}
				color="transparent"
				className="m-0 rounded-none flex justify-between p-4"
			>
				<div className="flex items-center gap-2">
					<Avatar
						withBorder
						className="p-0.5"
						variant="circular"
						alt="candice"
						color="cyan"
						src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600"
					/>

					<div className="flex flex-col">
						{post.user?.username && (
							<Typography
								variant="h6"
								color="blue-gray"
							>
								{post.user.username}
							</Typography>
						)}

						{post.created_at && (
							<Typography
								className="font-normal"
								variant="small"
							>
								{post.created_at}
							</Typography>
						)}
					</div>
				</div>
				<div className="flex gap-2">
					<IconButton
						variant="text"
						className="rounded-full"
						color="blue-gray"
					>
						<EllipsisHorizontalIcon className="w-6 x-6" />
					</IconButton>
					<IconButton
						variant="text"
						className="rounded-full"
						color="blue-gray"
					>
						<XMarkIcon className="w-6 x-6" />
					</IconButton>
				</div>
			</CardHeader>
			<CardBody className="p-0 w-full">
				{post?.image && (
					<img
						src={post.image}
						alt="ui/ux review check"
						className="object-cover w-full max-h-96 border-y-2"
					/>
				)}

				<div className="p-4 pt-0">
					{post?.content && (
						<Typography
							variant="paragraph"
							color="gray"
							className="font-normal"
						>
							{post.content}
						</Typography>
					)}
				</div>
			</CardBody>
			<CardFooter className="flex p-0 border-t-2">
				<div className="flex gap-4 items-center px-4 py-2">
					<div className="flex items-center gap-2">
						<motion.div
							whileHover={{ scale: 0.9 }}
							whileTap={{ scale: 1.1 }}
							style={{ x: 0 }}
						>
							<HeartIcon
								className="w-6 h-6"
								color={reaction ? 'red' : 'gray'}
								fill={reaction ? 'red' : 'none'}
								onClick={() => giveReaction()}
							/>
						</motion.div>

						<Typography
							variant="small"
							className="font-medium select-none"
						>
							120
						</Typography>
					</div>
					<div className="flex items-center gap-2">
						<ChatBubbleLeftIcon
							className="w-6 h-6"
							color="gray"
						/>
						<Typography
							variant="small"
							className="font-medium select-none"
						>
							40
						</Typography>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
}
