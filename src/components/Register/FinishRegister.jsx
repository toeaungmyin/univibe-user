import {
	Button,
	CardBody,
	CardFooter,
	Checkbox,
	Typography,
} from '@material-tailwind/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const FinishRegister = () => {
	const [isAgree, setAgree] = useState(false);
	const navigate = useNavigate();
	return (
		<>
			<CardBody className="flex flex-col gap-8 min-h-[20rem]">
				<Typography className=" text-justify text-sm">
					<span className="me-3 font-bold">1. Eligibility:</span>
					To use the "UniVibe" Student Social Network, you must be a student of
					University of Computer Studies, Mandalay, or an authorized member of
					the UCSM community.
				</Typography>
				<Typography className=" text-justify text-sm">
					<span className="me-3 font-bold">2. Account Registration:</span>
					Creating an account is necessary to access certain features of the
					"UniVibe" platform. You must provide accurate information and keep
					your account credentials confidential.
				</Typography>
				<Typography className=" text-justify text-sm">
					<span className="me-3 font-bold">3. User Conduct:</span>
					You are expected to use the "UniVibe" platform responsibly and in
					compliance with applicable laws. Prohibited activities include
					infringement of intellectual property, posting offensive content,
					impersonation, unauthorized access, and harassment of other users.
				</Typography>
				<Typography className=" text-justify text-sm">
					<span className="me-3 font-bold">4. Intellectual Property:</span>
					The content on the "UniVibe" platform, including text, graphics,
					logos, and software, is protected by intellectual property laws. You
					cannot use, reproduce, or modify the content without prior written
					consent from University of Computer Studies, Mandalay.
				</Typography>
				<Typography className=" text-justify text-sm">
					<span className="me-3 font-bold">
						5. Privacy and Data Protection:
					</span>
					"UniVibe" team values your privacy and takes measures to protect your
					personal information. Refer to our Privacy Policy for detailed
					information on how we collect, use, and safeguard your data.
				</Typography>
			</CardBody>
			<CardFooter className="pt-0">
				<Checkbox
					onClick={e => setAgree(e.target.checked)}
					label={
						<Typography
							color="blue-gray"
							className="font-medium flex"
						>
							I agree with the
							<Typography
								as="a"
								href="#"
								color="blue"
								className="font-medium hover:text-blue-700 transition-colors"
							>
								&nbsp;terms and conditions
							</Typography>
							.
						</Typography>
					}
				/>
				<div className="w-full flex justify-end">
					<Button
						variant="gradient"
						className="min-w-[8rem] bg-primary flex items-center justify-center"
						disabled={!isAgree}
						onClick={() => (isAgree ? navigate('/') : '')}
					>
						Finish
					</Button>
				</div>
			</CardFooter>
		</>
	);
};

export default FinishRegister;
