import {
	Alert,
	Button,
	CardBody,
	CardFooter,
	Input,
	Spinner,
	Typography,
} from '@material-tailwind/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerRequest } from '../../service/Auth';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const CreateAccount = ({ handleNext, setUserId, setCounter }) => {
	const [isLoading, setLoading] = useState(false);
	const [isEyeOpen, setEye] = useState(false);
	const handleEye = () => setEye(isEyeOpen => !isEyeOpen);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm();

	const registerAccount = async data => {
		setLoading(true);

		try {
			const response = await registerRequest(data);
			if (response.status === 200) {
				setUserId(response.data.user_id);
				setCounter(response.data.code_expire_time);
				handleNext();
			}
		} catch (error) {
			// Handle any unexpected errors here
			console.error('An error occurred:', error);
			// You can set a generic error message or take other actions as needed
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
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(registerAccount)}>
			<CardBody className='flex flex-col gap-8 min-h-[20rem]'>
				{errors.root && (
					<Alert
						className=' font-medium text-xs'
						color='orange'
						variant='ghost'>
						<span>{errors.root.message}</span>
					</Alert>
				)}
				<div className='flex flex-col gap-2'>
					<Input
						label='Username'
						size='lg'
						type='text'
						{...register('username', {
							required: 'Username field is required',
						})}
						error={errors.username}
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
						label='Email'
						size='lg'
						type='email'
						{...register('email', {
							required: 'Email field is required',
						})}
						error={errors.email}
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
						label='Password'
						size='lg'
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
						{...register('password', {
							required: 'Password field is required',
						})}
						error={errors.password}
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
						label='Birthday'
						defaultValue='2000-01-01'
						size='lg'
						type='date'
						{...register('birthday', {
							required: 'Birthday field is required',
						})}
						error={errors.birthday}
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
			</CardBody>
			<CardFooter className='pt-0'>
				<div className='w-full flex justify-end'>
					{/* <Button
						variant='text'
						className='min-w-[8rem] flex items-center justify-center'
						disabled={isLoading}
						onClick={handleNext}>
						Skip Register
					</Button> */}
					<Button
						variant='gradient'
						className='min-w-[8rem] bg-primary flex items-center justify-center'
						type='submit'
						disabled={isLoading}>
						{isLoading ? (
							<Spinner
								className='h-4 w-4 me-3'
								color='white'
							/>
						) : (
							''
						)}
						Next
					</Button>
				</div>
			</CardFooter>
		</form>
	);
};

export default CreateAccount;
