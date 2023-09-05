import React, { useContext, useEffect, useState } from 'react';
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Input,
	Typography,
	Textarea,
	IconButton,
	Alert,
	Spinner,
} from '@material-tailwind/react';
import { useForm } from 'react-hook-form';

import { XMarkIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { reportToUserRequest } from '../../service/User';
import { ThemeContext } from '../../ThemeContext/ThemeContext';

export function Report({ openReportDialoag, handleOpenReportDialoag }) {
	const user = useSelector(state => state.userReducer.selectedUser);
	const { theme } = useContext(ThemeContext);
	const [isLoading, setLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');

	const {
		register,
		formState: { errors },
		setError,
		reset,
		handleSubmit,
	} = useForm({
		defaultValues: {
			title: '',
			description: '',
		},
	});

	const sendReport = async data => {
		try {
			setLoading(true);
			const response = await reportToUserRequest(user?.id, data);
			if (response.status === 200) {
				reset();
				setSuccessMessage(response.data.message);
			}
		} catch (error) {
			console.error('Error:', error);
			if (error?.status === 422) {
				const errors = error.data.errors;
				if (errors && errors.title) {
					setError('title', {
						type: 'server',
						message: errors.title,
					});
				} else if (errors && errors.description) {
					setError('description', {
						type: 'server',
						message: errors.description,
					});
				} else if (errors.data.message) {
					setError('root', {
						type: 'server',
						message: errors.data.message,
					});
				}
			}
		} finally {
			setLoading(false);
		}
	};

	const [expand, setExpand] = useState(false);

	useEffect(() => {
		// Define a media query for screens with a max width of 960px
		const mediaQuery = window.matchMedia('(max-width: 960px)');

		// Initial check and set state based on the media query
		setExpand(mediaQuery.matches);

		// Add a listener for changes to the media query
		const mediaQueryListener = event => {
			setExpand(event.matches);
		};

		// Add the listener to the media query
		mediaQuery.addListener(mediaQueryListener);

		// Clean up the listener when the component unmounts
		return () => {
			mediaQuery.removeListener(mediaQueryListener);
		};
	}, []);

	return (
		<Dialog
			size={expand ? 'xxl' : 'sm'}
			open={openReportDialoag}
			handler={handleOpenReportDialoag}>
			<form onSubmit={handleSubmit(sendReport)}>
				<DialogHeader className='flex justify-between'>
					<div className='flex gap-2'>
						{expand && (
							<IconButton
								color='blue-gray'
								size='sm'
								variant='text'
								onClick={handleOpenReportDialoag}>
								<ChevronLeftIcon className='w-5 h-5' />
							</IconButton>
						)}
						<Typography
							variant='h5'
							color={theme !== 'dark' ? 'blue-gray' : 'white'}>
							Report
						</Typography>
					</div>
					{!expand && (
						<IconButton
							color='blue-gray'
							size='sm'
							variant='text'
							onClick={handleOpenReportDialoag}>
							<XMarkIcon className='w-5 h-5' />
						</IconButton>
					)}
				</DialogHeader>
				<DialogBody
					className='flex justify-center'
					divider>
					<div className='w-full max-w-lg mb-4 flex flex-col gap-6'>
						{errors.root && (
							<Alert
								color='orange'
								variant='ghost'
								className='text-xs'>
								<span>{errors.root.message}</span>
							</Alert>
						)}
						{successMessage !== '' ? (
							<Alert
								color='green'
								variant='ghost'
								className='text-xs'>
								<span>{successMessage}</span>
							</Alert>
						) : (
							<>
								<div className='flex flex-col gap-1'>
									<Input
										size='lg'
										label='Title'
										{...register('title', {
											required: 'Title Field is required',
										})}
										error={errors.title ? true : false}
									/>
									{errors.title && (
										<Typography
											className=' text-xs font-medium'
											color='red'
											variant='small'>
											{errors.title.message}
										</Typography>
									)}
								</div>
								<div className='flex flex-col'>
									<Textarea
										size='lg'
										label='Description'
										{...register('description', {
											required:
												'Description Field is required',
										})}
										error={
											errors.description ? true : false
										}
									/>
									{errors.description && (
										<Typography
											className=' text-xs font-medium'
											color='red'
											variant='small'>
											{errors.description.message}
										</Typography>
									)}
								</div>
							</>
						)}
					</div>
				</DialogBody>
				<DialogFooter>
					{successMessage === '' ? (
						<>
							<Button
								variant='text'
								color='gray'
								onClick={handleOpenReportDialoag}
								className='mr-1'>
								<span>Cancel</span>
							</Button>
							<Button
								variant='filled'
								color='orange'
								type='submit'
								className='flex gap-2 hover:shadow-none'
								disabled={isLoading ? true : false}>
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
							variant='filled'
							color='green'
							onClick={handleOpenReportDialoag}
							className='mr-1'>
							<span>Done</span>
						</Button>
					)}
				</DialogFooter>
			</form>
		</Dialog>
	);
}
