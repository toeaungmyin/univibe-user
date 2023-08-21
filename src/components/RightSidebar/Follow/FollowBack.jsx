import {
	List,
	ListItem,
	ListItemPrefix,
	Avatar,
	Card,
	Typography,
	Button,
	ListItemSuffix,
	IconButton,
	CardHeader,
} from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useContext } from 'react';
import { ThemeContext } from '../../../ThemeContext';

export function Followback() {
	const {theme} = useContext(ThemeContext);
	return (
		<Card
			className="w-full"
			shadow={false}
			color="transparent"
			style={{backgroundColor:theme === "dark"? "#3A434A" :"#F5F5F5" }}
		>
			<CardHeader
				floated={false}
				shadow={false}
				className="mx-0 my-2 rounded-none"
				color="transparent"
				style={{backgroundColor:theme === "dark"? "#0E0F11" :"#F5F5F5" }}
			>
				<Typography
					variant="h6"
					color="blue-gray"
					style={{color:theme === "dark"? "#fffffff" :"#0000000" }}
				>
					People who followed you
				</Typography>
			</CardHeader>
			<List className="p-0 gap-4">
				<ListItem
					className="bg-white shadow hover:bg-white focus:bg-white"
					ripple={false}
				>
					<ListItemPrefix className="flex gap-2">
						<IconButton
							variant="text"
							className="rounded-full"
							size="sm"
						>
							<XMarkIcon className="w-5 h-5" />
						</IconButton>
						<Avatar
							variant="circular"
							size="sm"
							withBorder
							className="p-0.5"
							alt="candice"
							src="https://images.pexels.com/photos/5378700/pexels-photo-5378700.jpeg?auto=compress&cs=tinysrgb&w=600"
						/>
					</ListItemPrefix>
					<div>
						<Typography
							variant="h6"
							color="blue-gray"
						>
							Tania Andrew
						</Typography>
					</div>
					<ListItemSuffix>
						<Button
							size="sm"
							color="cyan"
							className="hover:shadow-none"
						>
							Follow Back
						</Button>
					</ListItemSuffix>
				</ListItem>
				<ListItem
					className="bg-white shadow hover:bg-white focus:bg-white"
					ripple={false}
				>
					<ListItemPrefix className="flex gap-2">
						<IconButton
							variant="text"
							className="rounded-full"
							size="sm"
						>
							<XMarkIcon className="w-5 h-5" />
						</IconButton>
						<Avatar
							variant="circular"
							size="sm"
							withBorder
							className="p-0.5"
							alt="candice"
							src="https://images.pexels.com/photos/6976943/pexels-photo-6976943.jpeg?auto=compress&cs=tinysrgb&w=600"
						/>
					</ListItemPrefix>
					<div>
						<Typography
							variant="h6"
							color="blue-gray"
						>
							Ava Thompson
						</Typography>
					</div>
					<ListItemSuffix>
						<Button
							size="sm"
							color="cyan"
							className="hover:shadow-none"
						>
							Follow Back
						</Button>
					</ListItemSuffix>
				</ListItem>
				<ListItem
					className="bg-white shadow hover:bg-white focus:bg-white"
					ripple={false}
				>
					<ListItemPrefix className="flex gap-2">
						<IconButton
							variant="text"
							className="rounded-full"
							size="sm"
						>
							<XMarkIcon className="w-5 h-5" />
						</IconButton>
						<Avatar
							variant="circular"
							size="sm"
							withBorder
							className="p-0.5"
							alt="candice"
							src="https://images.pexels.com/photos/2773977/pexels-photo-2773977.jpeg?auto=compress&cs=tinysrgb&w=600"
						/>
					</ListItemPrefix>
					<div>
						<Typography
							variant="h6"
							color="blue-gray"
						>
							Amelia Lewis
						</Typography>
					</div>
					<ListItemSuffix>
						<Button
							size="sm"
							color="cyan"
							className="hover:shadow-none"
						>
							Follow Back
						</Button>
					</ListItemSuffix>
				</ListItem>
			</List>
		</Card>
	);
}
