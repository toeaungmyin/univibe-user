import {
	List,
	ListItem,
	ListItemSuffix,
	Chip,
	Card,
	ListItemPrefix,
} from '@material-tailwind/react';
import {
	HomeIcon,
	UserCircleIcon,
	BellIcon,
	ChatBubbleOvalLeftIcon,
} from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router';

export function LeftNavList() {
	const navigate = useNavigate();
	return (
		<Card className="w-full">
			<List>
				<ListItem onClick={() => navigate('/')}>
					<ListItemPrefix>
						<HomeIcon className="w-5 h-5" />
					</ListItemPrefix>
					Home
				</ListItem>
				<ListItem>
					<ListItemPrefix>
						<UserCircleIcon className="w-5 h-5" />
					</ListItemPrefix>
					Profile
				</ListItem>
				{/* <ListItem>
					<ListItemPrefix>
						<UserGroupIcon className="w-5 h-5" />
					</ListItemPrefix>
					Friends
					<ListItemSuffix>
						<Chip
							value="18"
							variant="ghost"
							size="sm"
							className="rounded-full"
						/>
					</ListItemSuffix>
				</ListItem> */}
				<ListItem onClick={() => navigate('/notifications')}>
					<ListItemPrefix>
						<BellIcon className="w-5 h-5" />
					</ListItemPrefix>
					Notifications
					<ListItemSuffix>
						<Chip
							value="18"
							variant="ghost"
							size="sm"
							className="rounded-full"
						/>
					</ListItemSuffix>
				</ListItem>
				<ListItem>
					<ListItemPrefix>
						<ChatBubbleOvalLeftIcon className="w-5 h-5" />
					</ListItemPrefix>
					Chat
					<ListItemSuffix>
						<Chip
							value="40"
							variant="ghost"
							size="sm"
							className="rounded-full"
						/>
					</ListItemSuffix>
				</ListItem>
			</List>
		</Card>
	);
}
