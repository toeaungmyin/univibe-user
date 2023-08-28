import { Avatar, Card, Typography } from '@material-tailwind/react';
import React, { useContext } from 'react';
import { DefaultProfileAvatar } from '../../../assets/images';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { ThemeContext } from '../../../ThemeContext/ThemeContext';

const ConversationHeader = () => {
	const { theme } = useContext(ThemeContext);

	return (
		<Card className='bg-gray-100 w-full shadow-none rounded-none border-b-2 p-4 flex flex-row justify-start gap-3 items-center'>
			<ChevronLeftIcon
				className={`w-5 h-5 font-medium ${
					theme !== 'dark' ? 'text-black' : 'text-blue-gray-100'
				}`}
			/>
			<Avatar
				variant='circular'
				size='sm'
				alt='tania andrew'
				className='border border-blue-500 p-0.5'
				src={DefaultProfileAvatar}
			/>
			<Typography
				variant='h6'
				color={theme !== 'dark' ? 'blue-gray' : 'white'}
				className='font-semibold'>
				Lucifer
			</Typography>
		</Card>
	);
};

export default ConversationHeader;
