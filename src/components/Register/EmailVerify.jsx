import {
	Alert,
	Button,
	CardBody,
	CardFooter,
	Input,
	Spinner,
	Typography,
} from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
	emailVerifyRequest,
	reSendEmailVerifyRequest,
} from '../../service/Auth';

const EmailVerify = ({ handleNext, userId, counter, setCounter }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm();

	const [isLoading, setLoading] = useState(false);
	const [isReSentLoading, setReSentLoading] = useState(false);
	const [message, setMessage] = useState('');
	const verifyEmail = async data => {
		try {
			setLoading(true);
			const response = await emailVerifyRequest(data);
			if (response?.status === 200) {
				const token = response.data.token;
				localStorage.clear();
				localStorage.setItem('user-token', token);
				axios.defaults.headers.common[
					'Authorization'
				] = `Bearer ${token}`;
				handleNext();
			}
		} catch (error) {
			console.log(error);
			if (error.status === 422) {
				setCounter(0);
				const errors = error.data.errors;
				if (errors) {
					if (errors.code) {
						setError('code', {
							type: 'server',
							message: errors.username,
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

		setLoading(false);
	};

	const reSendVerifyEmail = async userId => {
		try {
			setReSentLoading(true);
			const response = await reSendEmailVerifyRequest(userId);
			if (response.status === 200) {
				console.log(response);
				setMessage(response.data.message);
				setCounter(response.data.code_expire_time);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setReSentLoading(false);
		}
	};

	const [isMsgOpen, setMsgOpen] = useState(false);
	useEffect(() => {
		let msgTimmer;
		if (message) {
			setMsgOpen(true);
			msgTimmer = setTimeout(() => {
				setMsgOpen(false);
				setMessage(null);
			}, 5000);
		} else {
			setMsgOpen(false);
		}
		return () => {
			clearTimeout(msgTimmer);
		};
	}, [message, setMessage]);

	useEffect(() => {
		let msgTimmer;
		if (counter > 0) {
			msgTimmer = setTimeout(() => {
				setCounter(prev => prev - 1);
			}, 1000);
		}

		return () => {
			clearTimeout(msgTimmer);
		};
	}, [counter, setCounter]);

	return (
		<form onSubmit={handleSubmit(verifyEmail)}>
			<CardBody className='flex flex-col items-center justify-center gap-8 min-h-[20rem]'>
				<div className='flex flex-col gap-2'>
					{message && (
						<Alert
							open={isMsgOpen}
							className='font-medium text-xs'
							color='green'
							variant='ghost'>
							<span className='text-green-500 text-sm'>
								{message}
							</span>
						</Alert>
					)}

					<Input
						size='lg'
						type='text'
						label='CODE'
						maxLength={6}
						className='text-center text-[140%] font-semibold tracking-widest'
						{...register('code', { required: true })}
						error={errors.code || errors.root}
					/>
					{(errors.code || errors.root) && (
						<Typography
							className=' font-medium text-xs'
							color='red'
							variant='small'>
							<span>
								{errors.code?.message || errors.root?.message}
							</span>
						</Typography>
					)}
				</div>
				<div className='flex flex-row justify-between'>
					<div className='flex justify-center items-center p-2'>
						<Typography
							className='font-semibold text-sm'
							color='blue'
							variant='small'>
							<span>{counter}s</span>
						</Typography>
					</div>
					<Button
						variant='text'
						size='sm'
						className='flex gap-2 items-center justify-center'
						onClick={() => reSendVerifyEmail(userId)}>
						{isReSentLoading && <Spinner className='w-4 h-4' />}
						Resend Vertification Code
					</Button>
				</div>
			</CardBody>
			<CardFooter className='pt-0'>
				<div className='w-full flex justify-end'>
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

export default EmailVerify;
