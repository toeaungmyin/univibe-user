import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
} from '@material-tailwind/react';
import { useContext } from 'react';
import { FaPowerOff } from 'react-icons/fa6';
import { ThemeContext } from '../../ThemeContext/ThemeContext';
export default function DialogModel({
	isDialoagOpen,
	closeLogoutDialoag,
	handleLogout,
}) {
	const { theme } = useContext(ThemeContext);
	return (
		<Dialog
			open={isDialoagOpen}
			handler={closeLogoutDialoag}
			size='xs'
			className={`${theme !== 'dark' ? 'bg-white' : 'bg-gray-900'}`}>
			<DialogHeader className='relattive text-lg text-blue-gray-800 font-medium flex justify-center gap-4'>
				<FaPowerOff
					className={`absolute -top-8 h-20 w-20 border-[0.5rem]  bg-primary p-3 rounded-full  ${
						theme !== 'dark'
							? 'border-white text-blue-gray-50'
							: 'border-gray-900 text-blue-gray-100'
					}`}
				/>
			</DialogHeader>
			<DialogBody
				className={`text-center  font-normal ${
					theme !== 'dark'
						? 'text-blue-gray-800'
						: 'text-blue-gray-100'
				}`}>
				Are you sure you want to log out?
			</DialogBody>
			<DialogFooter className='justify-center'>
				<Button
					variant='text'
					color='blue-gray'
					onClick={closeLogoutDialoag}
					className='mr-1'>
					<span>Cancel</span>
				</Button>
				<Button onClick={handleLogout}>
					<span>Confirm</span>
				</Button>
			</DialogFooter>
		</Dialog>
	);
}
