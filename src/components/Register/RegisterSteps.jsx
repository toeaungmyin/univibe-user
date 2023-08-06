import React from 'react';
import { Stepper, Step } from '@material-tailwind/react';

export default function RegisterSteps({
	activeStep,
}) {
	return (
		<div className="w-full py-4 px-8">
			<Stepper
				activeStep={activeStep}
				color="cyan"
			>
				<Step className=" ">1</Step>
				<Step className=" ">2</Step>
				<Step className=" ">3</Step>
			</Stepper>
		</div>
	);
}
