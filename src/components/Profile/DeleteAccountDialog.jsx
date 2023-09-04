import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Spinner,
} from '@material-tailwind/react';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { FaCheck, FaTrashCan } from 'react-icons/fa6';
import { deleteAccountRequest } from '../../service/User';
import { getAuthUser } from '../../features/auth/AuthSlice';
export default function DeleteAccountDialoag({
	isOpenDeleteAccountDialoag,
	handleDeleteAccountDialoag,
}) {
	const authUser = useSelector(state => state.authReducer.user);
	const [isLoading, setLoading] = useState(false);
	const [isDeleted, setDeleted] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const deleteAccount = async () => {
		try {
			setLoading(true);
			const response = await deleteAccountRequest(authUser?.id);
			if (response.status === 200) {
				setDeleted(true);
				dispatch(getAuthUser(null));
				navigate('/sign-in');
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog
			open={isOpenDeleteAccountDialoag}
			handler={handleDeleteAccountDialoag}
			size='xs'>
			<DialogHeader className='relattive text-lg text-blue-gray-800 font-medium flex justify-center gap-4'>
				{isDeleted ? (
					<div className='absolute -top-8  border-[0.5rem] border-white bg-green-600 p-2 rounded-full '>
						<FaCheck className='h-10 w-10 text-blue-gray-50' />
					</div>
				) : (
					<div className='absolute -top-8  border-[0.5rem] border-white bg-primary p-2 rounded-full '>
						<FaTrashCan className='h-10 w-10 text-blue-gray-50' />
					</div>
				)}
			</DialogHeader>
			<DialogBody className=' text-center text-blue-gray-800 font-normal'>
				{isDeleted ? (
					<span>Account Deleted Successfully</span>
				) : (
					<span>Are you sure you want to delete this account?</span>
				)}
			</DialogBody>
			<DialogFooter className='justify-center'>
				{!isDeleted ? (
					<>
						<Button
							variant='text'
							color='blue-gray'
							onClick={handleDeleteAccountDialoag}
							className='mr-1'>
							<span>Cancel</span>
						</Button>
						<Button
							variant='filled'
							color='red'
							className='flex gap-2 shadow-none hover:shadow-none'
							disabled={isLoading ? true : false}
							onClick={deleteAccount}>
							{isLoading ? (
								<Spinner
									className='w-5 h-5'
									color='white'
								/>
							) : (
								''
							)}
							<span>Confirm</span>
						</Button>
					</>
				) : (
					<Button
						variant='text'
						color='cyan'
						onClick={() => navigate(-1)}
						className='mr-1'>
						<span>Done</span>
					</Button>
				)}
			</DialogFooter>
		</Dialog>
	);
}
