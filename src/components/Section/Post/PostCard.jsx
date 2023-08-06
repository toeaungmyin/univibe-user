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

export function PostCard() {
	const [reaction, setReaction] = useState(false);

	const giveReaction = () => {
		setReaction(!reaction);
	};

	return (
		<Card className="max-w-[38rem] overflow-hidden rounded-none md:rounded-lg">
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
						<Typography
							variant="h6"
							color="blue-gray"
						>
							Tania Andrew
						</Typography>
						<Typography
							className="font-normal"
							variant="small"
						>
							10h ago
						</Typography>
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
			<CardBody className="p-0">
				<img
					src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
					alt="ui/ux review check"
				/>
				<div className="p-4 pt-0">
					<Typography
						variant="paragraph"
						color="gray"
						className="font-normal"
					>
						Because it&apos;s about motivating the doers. Because I&apos;m here
						to follow my dreams and inspire others.
					</Typography>
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
