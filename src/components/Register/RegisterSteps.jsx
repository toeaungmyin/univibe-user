import React from 'react';
import { Stepper, Step } from '@material-tailwind/react';

export default function RegisterSteps({
	activeStep,
}) {
	return (
		<div className="w-full py-4 px-8">
			<Stepper activeStep={activeStep}>
				<Step className=" bg-primary">1</Step>
				<Step className=" bg-primary">2</Step>
				<Step className=" bg-primary">3</Step>
			</Stepper>
		</div>
	);
}
