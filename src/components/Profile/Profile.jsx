import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Tooltip,
} from '@material-tailwind/react';
import { useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';
import { useSelector } from 'react-redux';
import { DefaultProfileAvatar } from '../../assets/images';
import { PostCard } from '../Section/Post/PostCard';

export function Profile() {
	const { theme } = useContext(ThemeContext);
	const authUser = useSelector(state => state.authReducer.user);

	return (
		<Card
			className={`w-full min-h-[16rem] overflow-hidden rounded-none md:rounded-lg mt-2 ${
				theme !== 'dark' ? 'bg-white' : 'bg-gray-900'
			}`}
		>
			<CardHeader
				floated={false}
				shadow={false}
				className="flex justify-center items-center gap-8"
			>
				<div className="w-1/4">
					<div className="max-w-[12rem] max-h-[12rem] bg-cyan-700 rounded-full p-1">
						<img
							src={authUser?.profile_url}
							onError={e => (e.target.src = DefaultProfileAvatar)}
							alt="profile"
							className="object-center object-contain w-full h-full"
						/>
					</div>
				</div>
				<div className="w-2/4 flex flex-col gap-2">
					<div className="w-full">
						{authUser?.username && (
							<Typography
								variant="h4"
								color="blue-gray"
								className="mb-2"
							>
								{authUser?.username}
							</Typography>
						)}
						{authUser?.email && (
							<Typography
								variant="lead"
								color="cyan"
								className="mb-2 text-sm"
							>
								{authUser?.email}
							</Typography>
						)}
					</div>
					<div className="flex items-center gap-8">
						<div className="flex flex-col ">
							<Typography
								variant="h5"
								color="blue-gray"
							>
								{authUser?.followers.length}
							</Typography>
							<Typography
								variant="small"
								color="blue-gray"
							>
								Followers
							</Typography>
						</div>
						<div className="flex flex-col ">
							<Typography
								variant="h5"
								color="blue-gray"
							>
								{authUser?.followings.length}
							</Typography>
							<Typography
								variant="small"
								color="blue-gray"
							>
								Followings
							</Typography>
						</div>
						<div className="flex flex-col ">
							<Typography
								variant="h5"
								color="blue-gray"
							>
								{authUser?.friends.length}
							</Typography>
							<Typography
								variant="small"
								color="blue-gray"
							>
								Friends
							</Typography>
						</div>
					</div>
				</div>
			</CardHeader>
			<CardBody className="">Hello</CardBody>
		</Card>
	);
}
