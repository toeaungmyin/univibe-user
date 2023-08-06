import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
} from '@material-tailwind/react';
import { FaPowerOff } from 'react-icons/fa6';
export default function DialogModel({
	isDialoagOpen,
	closeLogoutDialoag,
	handleLogout,
}) {
	return (
		<Dialog
			open={isDialoagOpen}
			handler={closeLogoutDialoag}
			size="xs"
		>
			<DialogHeader className="relattive text-lg text-blue-gray-800 font-medium flex justify-center gap-4">
				<FaPowerOff className=" absolute -top-8 h-20 w-20 border-[0.5rem] border-white bg-primary p-3 rounded-full text-blue-gray-50" />
			</DialogHeader>
			<DialogBody className=" text-center text-blue-gray-800 font-normal">
				Are you sure you want to log out?
			</DialogBody>
			<DialogFooter className="justify-center">
				<Button
					variant="text"
					color="blue-gray"
					onClick={closeLogoutDialoag}
					className="mr-1"
				>
					<span>Cancel</span>
				</Button>
				<Button onClick={handleLogout}>
					<span>Confirm</span>
				</Button>
			</DialogFooter>
		</Dialog>
	);
}
