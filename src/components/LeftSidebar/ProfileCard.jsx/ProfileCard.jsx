import { Card, CardHeader, Typography, Avatar } from '@material-tailwind/react';
import { useSelector } from 'react-redux';

export function ProfileCard() {
	const authUser = useSelector(state => state.authReducer.user);
	return (
		<Card className="w-full flex justify-start items-center p-4">
			<CardHeader
				color="transparent"
				floated={false}
				shadow={false}
				className="flex justify-center items-center gap-6 m-0 rounded-none"
			>
				<Avatar
					size="md"
					variant="circular"
					withBorder={true}
					className="p-0.5"
					src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
					alt="tania andrew"
				/>
				<div className="flex w-full flex-col gap-0.5">
					{authUser?.username && (
						<Typography
							variant="h6"
							color="blue-gray"
						>
							{authUser.username}
						</Typography>
					)}
				</div>
			</CardHeader>
		</Card>
	);
}
