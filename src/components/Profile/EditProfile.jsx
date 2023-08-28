import React, { useEffect, useState } from 'react';
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Typography,
	Avatar,
	IconButton,
	Input,
} from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultProfileAvatar } from '../../assets/images';
import {
	XMarkIcon,
	EyeIcon,
	EyeSlashIcon,
	ChevronLeftIcon,
} from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { updateUserRequest } from '../../service/User';
import { getAuthUser } from '../../features/auth/AuthSlice';

export function EditProfile({ handleOpen, open }) {
	const authUser = useSelector(state => state.authReducer.user);
	const dispatch = useDispatch();
	const [isEyeOpen, setEye] = useState(false);
	const handleEye = () => setEye(isEyeOpen => !isEyeOpen);
	const {
		register,
		formState: { errors },
		setError,
		handleSubmit,
	} = useForm({});

	const updateUser = async data => {
		try {
			const filteredData = Object.keys(data).reduce((acc, key) => {
				if (
					data[key] !== null &&
					data[key] !== '' &&
					data[key] !== authUser[key]
				) {
					acc[key] = data[key];
				}
				return acc;
			}, {});

			const response = await updateUserRequest(authUser.id, filteredData);
			dispatch(getAuthUser(response.data));
			handleOpen();
		} catch (error) {
			if (error.status === 422) {
				const errors = error.data.errors;
				if (errors) {
					if (errors.username) {
						setError('username', {
							type: 'server',
							message: errors.username,
						});
					}
					if (errors.email) {
						setError('email', {
							type: 'server',
							message: errors.email,
						});
					}
					if (errors.password) {
						setError('password', {
							type: 'server',
							message: errors.password,
						});
					}
					if (errors.birthday) {
						setError('birthday', {
							type: 'server',
							message: errors.birthday,
						});
					}
				} else {
					setError('root', {
						type: 'server',
						message: error.data.message,
					});
				}
			}
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
			open={open}
			handler={handleOpen}
			size={expand ? 'xxl' : 'md'}
		>
			{authUser && (
				<DialogHeader className='justify-between items-center'>
					<div className='flex gap-2 items-center'>
						{expand && (
							<IconButton
								color='blue-gray'
								size='sm'
								variant='text'
								onClick={handleOpen}>
								<ChevronLeftIcon className='w-5 h-5' />
							</IconButton>
						)}
						<Avatar
							withBorder
							size='sm'
							className='p-0.5'
							variant='circular'
							alt='candice'
							color='cyan'
							onError={e => (e.target.src = DefaultProfileAvatar)}
							src={authUser?.profile_url}
						/>

						<Typography
							variant='h6'
							className='font-semibold [word-spacing:0.05rem]'>
							{`${authUser.username}'s Information`}
						</Typography>
					</div>
					{!expand && (
						<IconButton
							color='blue-gray'
							size='sm'
							variant='text'
							onClick={handleOpen}>
							<XMarkIcon className='w-5 h-5' />
						</IconButton>
					)}
				</DialogHeader>
			)}
			<form
				className='w-full flex flex-col justify-center'
				onSubmit={handleSubmit(updateUser)}>
				<DialogBody
					divider
					className='w-full flex justify-center'>
					<div className='w-full md:w-2/3 flex flex-col gap-6'>
						<div className='flex flex-col gap-2'>
							<Input
								size='lg'
								label='Username'
								defaultValue={authUser?.username || ''}
								{...register('username')}
								error={!!errors.username}
							/>
							{errors.username && (
								<Typography
									className=' font-medium text-xs'
									color='red'
									variant='small'>
									<span>{errors.username.message}</span>
								</Typography>
							)}
						</div>
						<div className='flex flex-col gap-2'>
							<Input
								size='lg'
								label='Email'
								defaultValue={authUser?.email || ''}
								{...register('email')}
								error={!!errors.email}
							/>
							{errors.email && (
								<Typography
									className=' font-medium text-xs'
									color='red'
									variant='small'>
									<span>{errors.email.message}</span>
								</Typography>
							)}
						</div>
						<div className='flex flex-col gap-2'>
							<Input
								size='lg'
								label='Password'
								type={isEyeOpen ? 'text' : 'password'}
								icon={
									isEyeOpen ? (
										<EyeIcon
											className='w-5 h-5 transition ease-in-out focus:scale-95'
											onClick={handleEye}
										/>
									) : (
										<EyeSlashIcon
											className='w-5 h-5 transition ease-in-out focus:scale-95'
											onClick={handleEye}
										/>
									)
								}
								{...register('password')}
								error={!!errors.password}
							/>
							{errors.password && (
								<Typography
									className=' font-medium text-xs'
									color='red'
									variant='small'>
									<span>{errors.password.message}</span>
								</Typography>
							)}
						</div>
						<div className='flex flex-col gap-2'>
							<Input
								type='date'
								size='lg'
								label='Birthday'
								defaultValue={authUser?.birthday || ''}
								{...register('birthday')}
								error={!!errors.birthday}
							/>
							{errors.birthday && (
								<Typography
									className=' font-medium text-xs'
									color='red'
									variant='small'>
									<span>{errors.birthday.message}</span>
								</Typography>
							)}
						</div>
					</div>
				</DialogBody>
				<DialogFooter className='justify-center'>
					<Button
						fullWidth
						variant='filled'
						color='cyan'
						type='submit'>
						<span>Confirm</span>
					</Button>
				</DialogFooter>
			</form>
		</Dialog>
	);
}
