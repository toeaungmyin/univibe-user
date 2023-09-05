import React, { useEffect, useRef } from 'react';
import Message from './Message';
import { getMessagesRequest } from '../../../service/Message';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Typography } from '@material-tailwind/react';
import { useParams } from 'react-router';
import { getMessages } from '../../../features/auth/MessageSlice';
import { HelloMessage } from '../../../assets/images';

const MessageList = () => {
	const containerRef = useRef(null);
	const dispatch = useDispatch();
	const { userId } = useParams();
	const messages = useSelector(state => state.messageReducer.messages);

	// Function to scroll the container to the bottom
	const scrollToBottom = () => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	};

	// Scroll to the bottom whenever post.comments changes
	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const response = await getMessagesRequest(userId);
				if (response.status === 200) {
					dispatch(getMessages(response.data.messages));
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchMessages();
		scrollToBottom();
		const intervalId = setInterval(() => {
			fetchMessages();
		}, 3000);

		return () => clearInterval(intervalId);
	}, [dispatch, userId]);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<div
			className='flex flex-col gap-2 p-2 px-6 max-h-full overflow-scroll no-scrollbar'
			ref={containerRef}>
			{messages && messages.length > 0 ? (
				messages.map((message, index) => (
					<Message
						key={index}
						message={message}
					/>
				))
			) : messages && messages.length === 0 ? (
				<div className='flex flex-col gap-4 items-center justify-center p-5'>
					<img
						className='w-20 object-contain object-center'
						src={HelloMessage}
						alt='nature'
					/>
					<Typography
						variant='h5'
						className='mb-2 text-blue-gray-900'>
						Say "Hello"
					</Typography>
				</div>
			) : (
				<div className='flex justify-center p-5'>
					<Spinner className='w-10 h-10' />
				</div>
			)}
		</div>
	);
};

export default MessageList;
