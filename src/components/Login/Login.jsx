import React, { useState } from 'react';
import './Login.css';
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Input,
	Checkbox,
	Button,
	Spinner,
	Alert,
} from '@material-tailwind/react';
import TextLogo from './../../assets/logo/logo-02.svg';
import { useForm } from 'react-hook-form';
import { loginRequest } from '../../server/Auth';
import { useNavigate } from 'react-router';

const Login = () => {
	const [isLoading, setLoading] = useState(false);
	const navigate = useNavigate();

	const {
		register,
		setValue,
		formState: { errors },
		setError,
		handleSubmit,
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			remember_me: '0',
		},
	});

	const login = async data => {
		setLoading(true);
		try {
			const response = await loginRequest(data);
			if (response?.status === 200) {
				console.log(response.data);
				const token = response.data.token;
				localStorage.clear();
				localStorage.setItem('user-token', token);
				navigate('/');
			} else {
				if (response.status === 422) {
					const errors = response.data.errors;
					if (errors && errors.email) {
						setError('email', {
							type: 'server',
							message: errors.email,
						});
					} else if (errors && errors.password) {
						setError('password', {
							type: 'server',
							message: errors.password,
						});
					} else if (response.data.message) {
						setError('root', {
							type: 'server',
							message: response.data.message,
						});
					}
				}
			}
		} catch (error) {
			console.error('Error:', error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<>
			<div className=" w-full min-h-screen sm:bg-gray-200 flex flex-col items-center justify-center">
				<div className="flex flex-row bg-white border items-center rounded-md w-full sm:w-1/4 sm:min-w-[28rem] mb-10">
					<Card
						className="w-full h-full"
						shadow={false}
						color="transparent"
					>
						<CardHeader
							floated={false}
							shadow={false}
							color="transparent"
							className="mb-5 flex flex-col sm:flex-row justify-center items-center gap-2"
						>
							<img
								className="w-24 transition duration-150 object-contain"
								width={'100%'}
								height={'100%'}
								src={TextLogo}
								alt="logo"
							/>
							<Typography
								variant="h1"
								className="suezOne text-primary tracking-wider text-5xl"
							>
								UniVibe
							</Typography>
						</CardHeader>
						<form onSubmit={handleSubmit(login)}>
							<CardBody className="flex flex-col gap-6 ">
								{errors.root && (
									<Alert
										color="orange"
										variant="ghost"
										className="text-xs"
									>
										<span>{errors.root.message}</span>
									</Alert>
								)}
								<div className="flex flex-col gap-2">
									<Input
										label="Email"
										size="lg"
										{...register('email', {
											required: 'Email field is required',
										})}
										error={errors.email ? true : false}
									/>
									{errors.email && (
										<Typography
											className="text-xs font-medium"
											color="red"
											variant="small"
										>
											{errors.email.message}
										</Typography>
									)}
								</div>
								<div className="flex flex-col gap-2">
									<Input
										label="Password"
										size="lg"
										type="password"
										icon={<i className="fas fa-heart" />}
										{...register('password', {
											required: 'Password Field is required',
										})}
										error={errors.password ? true : false}
									/>
									{errors.password && (
										<Typography
											className=" text-xs font-medium"
											color="red"
											variant="small"
										>
											{errors.password.message}
										</Typography>
									)}
								</div>
								<div className="flex justify-between items-center">
									<div className="-ml-2.5">
										<Checkbox
											label="Remember Me"
											onClick={e =>
												e.target.checked
													? setValue('remember_me', '1')
													: setValue('remember_me', '0')
											}
										/>
									</div>
									<Button
										variant="text"
										size="sm"
									>
										Forgot Password?
									</Button>
								</div>
							</CardBody>
							<CardFooter className="pt-0">
								<Button
									variant="gradient"
									className="bg-primary flex justify-center items-center"
									type="submit"
									fullWidth
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
									Sign In
								</Button>
								<Typography
									variant="small"
									className="mt-6 flex justify-center"
								>
									Don't have an account?
									<Typography
										as="a"
										href=""
										onClick={e => {
											e.preventDefault();
											navigate('/sign-up');
										}}
										variant="small"
										color="blue"
										className="ml-1 font-bold"
									>
										Sign up
									</Typography>
								</Typography>
							</CardFooter>
						</form>
					</Card>
				</div>
				<Typography
					variant="h6"
					className=" text-opacity-80 text-black mb-5 text-xs px-5 text-center"
				>
					Copyright &copy; 2023 UniVibe Student Social Network by Group I.All
					right reserved
				</Typography>
			</div>
		</>
	);
};

export default Login;
