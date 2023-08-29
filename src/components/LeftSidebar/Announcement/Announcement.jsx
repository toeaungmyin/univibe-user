import { Card, CardBody, Typography } from '@material-tailwind/react';
import { useContext } from 'react';
import { ThemeContext } from '../../../ThemeContext/ThemeContext';

export function Announcement() {
	const {theme} = useContext(ThemeContext)
	return (
		<Card
			className={`w-full rounded-md ${
				theme !== 'dark' ? 'bg-white' : 'bg-gray-900'
			}`}>
			<CardBody>
				<Typography
					variant='h5'
					color='blue-gray'
					className={`mb-2 ${
						theme !== 'dark'
							? 'text-blue-gray-900'
							: 'text-blue-gray-50'
					}`}>
					Welcome to
					<span className='suezOne text-cyan-700 ms-2 tracking-wider text-xl'>
						UniVibe
					</span>
				</Typography>
				<Typography
					className='text-justify leading-tight text-blue-gray-600 font-normal'
					style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>
					Hey UCSM Students, Get ready to experience{' '}
					<span className='font-semibold text-cyan-500'>UniVibe</span>
					, your all-in-one social network! Connect, collaborate, and
					have a blast with fellow students, faculty, and clubs. From
					study groups to campus events, UniVibe has it all! Join now
					and let's make this journey unforgettable!
					<span className='line-clamp-1 text-right text-cyan-700'>
						@team.univibe
					</span>
				</Typography>
			</CardBody>
		</Card>
	);
}
