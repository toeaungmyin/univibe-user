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

const CreateAccount = ({ handleNext, setUserId }) => {
	const [isLoading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm();

	const registerAccount = async data => {
		setLoading(true);
		const response = await registerRequest(data);
		setLoading(false);

		if (response.status === 200) {
			setUserId(response.data.data.user_id);
			handleNext();
		} else {
			console.log(response.status);
			if (response.status === 422) {
				const errors = response.data.errors;
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
						message: response.data.message,
					});
				}
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(registerAccount)}>
			<CardBody className="flex flex-col gap-8 min-h-[20rem]">
				{errors.root && (
					<Alert
						className=" font-medium text-xs"
						color="orange"
						variant="ghost"
					>
						<span>{errors.root.message}</span>
					</Alert>
				)}
				<div className="flex flex-col gap-2">
					<Input
						label="Username"
						size="lg"
						type="text"
						{...register('username', {
							required: 'Username field is required',
						})}
					/>
					{errors.username && (
						<Typography
							className=" font-medium text-xs"
							color="red"
							variant="small"
						>
							<span>{errors.username.message}</span>
						</Typography>
					)}
				</div>
				<div className="flex flex-col gap-2">
					<Input
						label="Email"
						size="lg"
						type="email"
						{...register('email', { required: 'Email field is required' })}
					/>
					{errors.email && (
						<Typography
							className=" font-medium text-xs"
							color="red"
							variant="small"
						>
							<span>{errors.email.message}</span>
						</Typography>
					)}
				</div>
				<div className="flex flex-col gap-2">
					<Input
						label="Password"
						size="lg"
						type="password"
						{...register('password', {
							required: 'Password field is required',
						})}
					/>
					{errors.password && (
						<Typography
							className=" font-medium text-xs"
							color="red"
							variant="small"
						>
							<span>{errors.password.message}</span>
						</Typography>
					)}
				</div>

				<div className="flex flex-col gap-2">
					<Input
						label="Birthday"
						size="lg"
						type="date"
						{...register('birthday', {
							required: 'Birthday field is required',
						})}
					/>
					{errors.birthday && (
						<Typography
							className=" font-medium text-xs"
							color="red"
							variant="small"
						>
							<span>{errors.birthday.message}</span>
						</Typography>
					)}
				</div>
			</CardBody>
			<CardFooter className="pt-0">
				<div className="w-full flex justify-end">
					<Button
						variant="gradient"
						className="min-w-[8rem] bg-primary flex items-center justify-center"
						type="submit"
						disabled={isLoading}
					>
						{isLoading ? (
							<Spinner
								className="h-4 w-4 me-3"
								color="white"
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
