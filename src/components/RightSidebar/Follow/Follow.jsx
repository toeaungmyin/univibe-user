import {
	List,
	ListItem,
	ListItemPrefix,
	Avatar,
	Card,
	Typography,
	ListItemSuffix,
	Button,
	CardHeader,
} from '@material-tailwind/react';

export function Follow() {
	return (
		<Card className="w-full">
			<CardHeader
				floated={false}
				shadow={false}
				className="my-2 rounded-none"
				color="transparent"
			>
				<Typography
					variant="h6"
					color="blue-gray"
				>
					People you may know
				</Typography>
			</CardHeader>
			<List className="p-0 gap-0">
				<ListItem
					className="bg-white hover:bg-white focus:bg-white rounded-none"
					ripple={false}
				>
					<ListItemPrefix>
						<Avatar
							withBorder
							className="p-0.5"
							variant="circular"
							alt="candice"
							src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600"
						/>
					</ListItemPrefix>
					<div>
						<Typography
							variant="h6"
							color="blue-gray"
						>
							Lucas Ramirez
						</Typography>
					</div>
					<ListItemSuffix>
						<Button
							size="sm"
							color="cyan"
						>
							Follow
						</Button>
					</ListItemSuffix>
				</ListItem>
				<ListItem
					className="bg-white hover:bg-white focus:bg-white rounded-none"
					ripple={false}
				>
					<ListItemPrefix>
						<Avatar
							withBorder
							className="p-0.5"
							variant="circular"
							alt="alexander"
							src="https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=600"
						/>
					</ListItemPrefix>
					<div>
						<Typography
							variant="h6"
							color="blue-gray"
						>
							Alexander
						</Typography>
					</div>
					<ListItemSuffix>
						<Button
							size="sm"
							color="cyan"
						>
							Follow
						</Button>
					</ListItemSuffix>
				</ListItem>
				<ListItem
					className="bg-white hover:bg-white focus:bg-white rounded-none"
					ripple={false}
				>
					<ListItemPrefix>
						<Avatar
							withBorder
							className="p-0.5"
							variant="circular"
							alt="emma"
							src="https://images.pexels.com/photos/1547971/pexels-photo-1547971.jpeg?auto=compress&cs=tinysrgb&w=600"
						/>
					</ListItemPrefix>
					<div>
						<Typography
							variant="h6"
							color="blue-gray"
						>
							Emma Willever
						</Typography>
					</div>
					<ListItemSuffix>
						<Button
							size="sm"
							color="cyan"
						>
							Follow
						</Button>
					</ListItemSuffix>
				</ListItem>
				<ListItem
					className="bg-white hover:bg-white focus:bg-white rounded-none"
					ripple={false}
				>
					<ListItemPrefix>
						<Avatar
							variant="circular"
							withBorder
							className="p-0.5"
							alt="emma"
							src="https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=600"
						/>
					</ListItemPrefix>
					<div>
						<Typography
							variant="h6"
							color="blue-gray"
						>
							Emma Willever
						</Typography>
					</div>
					<ListItemSuffix>
						<Button
							size="sm"
							color="cyan"
						>
							Follow
						</Button>
					</ListItemSuffix>
				</ListItem>
				<ListItem
					className="bg-white hover:bg-white focus:bg-white rounded-none"
					ripple={false}
				>
					<ListItemPrefix>
						<Avatar
							variant="circular"
							withBorder
							className="p-0.5"
							alt="emma"
							src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=600"
						/>
					</ListItemPrefix>
					<div>
						<Typography
							variant="h6"
							color="blue-gray"
						>
							Emma Willever
						</Typography>
					</div>
					<ListItemSuffix>
						<Button
							size="sm"
							color="cyan"
						>
							Follow
						</Button>
					</ListItemSuffix>
				</ListItem>
			</List>
		</Card>
	);
}
