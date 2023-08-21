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
import { useContext } from 'react';
import { ThemeContext } from '../../../ThemeContext';
export function LeftNavList() {
	const navigate = useNavigate();
	const {theme,toogleTheme} = useContext(ThemeContext);
 	const handleTheme = () =>{
		toogleTheme();
 }
	return (
		<Card className="w-full"
		style={{backgroundColor:theme === "dark"? "#0E0F11" :"#F5F5F5" }}
		>
			<List>
				<ListItem onClick={() => navigate('/')}
				style={{color:theme === "dark"? "#ffffff" :"#000000" }}>
					<ListItemPrefix>
						<HomeIcon className="w-5 h-5" />
					</ListItemPrefix>
					Home
				</ListItem>
				<ListItem
				style={{color:theme === "dark"? "#ffffff" :"#000000" }}>
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
				<ListItem onClick={() => navigate('/notifications')}
				style={{color:theme === "dark"? "#ffffff" :"#000000" }}>
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
				<ListItem
				style={{color:theme === "dark"? "#ffffff" :"#000000" }}>
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
				<ListItem onClick={()=>handleTheme()}
				style={{color:theme === "dark"? "#ffffff" :"#000000" }}>
					<ListItemPrefix>
						<ChatBubbleOvalLeftIcon className="w-5 h-5" />
					</ListItemPrefix>
					DarkMode
					
				</ListItem>
			</List>
		</Card>
	);
}
