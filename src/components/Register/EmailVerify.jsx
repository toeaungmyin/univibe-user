import {
	Button,
	CardBody,
	CardFooter,
	Input,
	Spinner,
} from '@material-tailwind/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
	emailVerifyRequest,
	reSendEmailVerifyRequest,
} from '../../server/Auth';

const EmailVerify = ({ handleNext, userId }) => {
	const [isLoading, setLoading] = useState(false);
	const { register, handleSubmit } = useForm();
	const verifyEmail = async data => {
		setLoading(true);
		const response = await emailVerifyRequest(data);
		if (response?.status === 200) {
			const token = response.data.token;
			localStorage.clear();
			localStorage.setItem('user-token', token);
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			handleNext();
		} else {
			if (response.status === 401) {
				console.log(response.data.message);
			}
		}
		setLoading(false);
	};

	const reSendVerifyEmail = async userId => {
		const response = await reSendEmailVerifyRequest(userId);
		if (response.status === 200) {
			console.log(response);
		}
	};

	return (
		<form onSubmit={handleSubmit(verifyEmail)}>
			<CardBody className="flex flex-col items-center justify-center gap-8 min-h-[20rem]">
				<Input
					size="lg"
					type="text"
					label="CODE"
					maxLength={6}
					className="text-center text-[150%] tracking-widest"
					{...register('code', { required: true })}
				/>
				<div className="flex flex-row justify-between">
					<Button
						variant="text"
						size="sm"
						onClick={() => reSendVerifyEmail(userId)}
					>
						Resend Vertification Code
					</Button>
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

export default EmailVerify;
