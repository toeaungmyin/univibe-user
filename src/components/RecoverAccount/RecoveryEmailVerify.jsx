import React, { useState } from 'react';
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Input,
	Button,
	Spinner,
	Alert,
} from '@material-tailwind/react';
import TextLogo from './../../assets/logo/logo-02.svg';
import { useForm } from 'react-hook-form';
import { recoveryEmailVerifyRequest } from '../../service/Auth';
import { useNavigate } from 'react-router';

const RecoveryEmailVerify = () => {
	const [isLoading, setLoading] = useState(false);
	const navigate = useNavigate();
	const {
		register,
		formState: { errors },
		setError,
		handleSubmit,
	} = useForm({
		defaultValues: {
			code: '',
		},
	});

	const emailVerifyRequest = async data => {
		setLoading(true);
		try {
			const response = await recoveryEmailVerifyRequest(data);
			if (response?.status === 200) {
				const token = response.data.token;
				localStorage.clear();
				localStorage.setItem('user-token', token);
				navigate('/reset-password');
			}
		} catch (error) {
			console.error('Error:', error);
			if (error.status === 422) {
				const errors = error.data.errors;
				if (errors && errors.code) {
					setError('code', {
						type: 'server',
						message: errors.code,
					});
				} else if (error.data.message) {
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
		<>
			<div className=' w-full min-h-screen sm:bg-gray-200 flex flex-col items-center justify-center'>
				<div className='flex flex-row bg-white border items-center rounded-md w-full sm:w-1/4 sm:min-w-[28rem] mb-10'>
					<Card
						className='w-full h-full'
						shadow={false}
						color='transparent'>
						<CardHeader
							floated={false}
							shadow={false}
							color='transparent'
							className='mb-5 flex flex-col sm:flex-row justify-center items-center gap-1'>
							<img
								className='w-24 transition duration-150 object-contain'
								width={'100%'}
								height={'100%'}
								src={TextLogo}
								alt='logo'
							/>
							<Typography
								variant='h1'
								className='suezOne text-cyan-700 tracking-wider text-5xl'>
								UniVibe
							</Typography>
						</CardHeader>
						<form
							onSubmit={handleSubmit(emailVerifyRequest)}
							className='h-72 flex flex-col justify-between'>
							<CardBody className='flex flex-col gap-6 items-center '>
								<div className='flex flex-col gap-2'>
									{errors.root && (
										<Alert
											color='orange'
											variant='ghost'
											className='text-xs'>
											<span>{errors.root.message}</span>
										</Alert>
									)}
									<Input
										size='lg'
										type='text'
										label='RESET CODE'
										maxLength={6}
										className='text-center text-[140%] font-medium tracking-widest'
										{...register('code', {
											required: true,
										})}
									/>
									{errors.code && (
										<Typography
											className=' font-medium text-xs'
											color='red'
											variant='small'>
											<span>{errors.code.message}</span>
										</Typography>
									)}
								</div>
							</CardBody>
							<CardFooter className='pt-0 flex justify-between items-center'>
								<Typography
									as='a'
									href=''
									onClick={e => {
										e.preventDefault();
										navigate(-1);
									}}
									variant='small'
									color='blue'
									className='ml-1 font-bold'>
									Back
								</Typography>
								<Button
									variant='filled'
									className='hover:shadow-none bg-primary flex justify-center items-center'
									type='submit'
									color='cyan'
									disabled={isLoading}>
									{isLoading ? (
										<Spinner
											className='h-4 w-4 me-3'
											color='white'
										/>
									) : (
										''
									)}
									Verify
								</Button>
							</CardFooter>
						</form>
					</Card>
				</div>
				<Typography
					variant='h6'
					className=' text-opacity-80 text-black mb-5 text-xs px-5 text-center'>
					Copyright &copy; 2023 UniVibe Student Social Network by
					Group I.All right reserved
				</Typography>
			</div>
		</>
	);
};

export default RecoveryEmailVerify;
