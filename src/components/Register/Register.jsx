import React, { useState } from 'react';
import './Register.css';
import { Card, Typography, CardHeader } from '@material-tailwind/react';
import TextLogo from './../../assets/logo/logo-02.svg';
import RegisterSteps from './RegisterSteps';
import CreateAccount from './CreateAccount';
import EmailVerify from './EmailVerify';
import FinishRegister from './FinishRegister';

const Register = () => {
	const [activeStep, setActiveStep] = React.useState(0);
	const [isLastStep, setIsLastStep] = React.useState(false);
	const [isFirstStep, setIsFirstStep] = React.useState(false);
	const [counter, setCounter] = useState(0);

	const [userId, setUserId] = useState('');

	const handleNext = () => !isLastStep && setActiveStep(cur => cur + 1);
	const handlePrev = () => !isFirstStep && setActiveStep(cur => cur - 1);
	return (
		<>
			<div className=' w-full min-h-screen sm:bg-gray-100 flex flex-col items-center justify-around'>
				<div className='flex flex-col justify-center items-center py-5 mt- rounded-md w-full sm:w-1/4 sm:min-w-[28rem]'>
					<div className='flex flex-row justify-center items-center'>
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
					</div>
					<RegisterSteps activeStep={activeStep} />
				</div>
				<div className='flex flex-row bg-white items-center rounded-md w-full sm:w-1/4 sm:min-w-[28rem] mb-10'>
					<Card
						className='w-full h-full'
						shadow={false}
						color='transparent'>
						<CardHeader
							floated={false}
							shadow={false}
							color='transparent'
							className='flex flex-col sm:flex-row justify-center items-center py-5'>
							<Typography
								variant='h1'
								className=' text-center text-primary text-2xl font-bold uppercase'>
								{activeStep === 0
									? 'sign up'
									: activeStep === 1
									? 'ucsm email verify'
									: 'Privacy Policy for Student Social Network'}
							</Typography>
						</CardHeader>
						{activeStep === 0 ? (
							<CreateAccount
								setIsFirstStep={setIsFirstStep}
								setIsLastStep={setIsLastStep}
								setActiveStep={setActiveStep}
								activeStep={activeStep}
								handleNext={handleNext}
								handlePrev={handlePrev}
								setUserId={setUserId}
								setCounter={setCounter}
							/>
						) : activeStep === 1 ? (
							<EmailVerify
								counter={counter}
								setCounter={setCounter}
								setIsFirstStep={setIsFirstStep}
								setIsLastStep={setIsLastStep}
								setActiveStep={setActiveStep}
								activeStep={activeStep}
								handleNext={handleNext}
								handlePrev={handlePrev}
								userId={userId}
							/>
						) : (
							<FinishRegister
								setIsFirstStep={setIsFirstStep}
								setIsLastStep={setIsLastStep}
								setActiveStep={setActiveStep}
								activeStep={activeStep}
								handleNext={handleNext}
								handlePrev={handlePrev}
							/>
						)}
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

export default Register;
