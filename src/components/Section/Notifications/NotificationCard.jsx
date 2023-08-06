import {
	ListItem,
	ListItemPrefix,
	Avatar,
	Typography,
	IconButton,
	ListItemSuffix,
} from '@material-tailwind/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';

export function NotificationCard({ user, profile_url, notification }) {
	return (
		<ListItem className="bg-white shadow">
			<ListItemPrefix>
				<Avatar
					withBorder
					className="p-0.5"
					variant="circular"
					alt="candice"
					color="cyan"
					src={profile_url}
				/>
			</ListItemPrefix>
			<div>
				<Typography
					variant="h6"
					color="blue-gray"
				>
					{user.name}
					<span className="text-blue-gray-700 font-medium text-sm ms-1">
						{notification.description}
					</span>
				</Typography>
				<Typography
					variant="small"
					className="font-normal text-gray-400"
				>
					{notification.created_at}
				</Typography>
			</div>
			<ListItemSuffix>
				<IconButton
					variant="text"
					className="rounded-full"
				>
					<EllipsisVerticalIcon className="w-5 h-5" />
				</IconButton>
			</ListItemSuffix>
		</ListItem>
	);
}
