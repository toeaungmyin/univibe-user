import { Card, List, Spinner, Typography } from '@material-tailwind/react';
import React, { useContext, useEffect } from 'react';
import ConversationItmes from './ConversationItmes';
import { ThemeContext } from '../../../ThemeContext/ThemeContext';
import { getConversationsRequest } from '../../../service/Message';
import { useDispatch, useSelector } from 'react-redux';
import { getConversations } from '../../../features/auth/MessageSlice';

const ConversationList = () => {
	const conversations = useSelector(
		state => state.messageReducer.conversations
	);
	const { theme } = useContext(ThemeContext);
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchConversations = async () => {
			try {
				const response = await getConversationsRequest();
				if (response.status === 200) {
					dispatch(getConversations(response.data.conversations));
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchConversations();
	}, [dispatch]);
	return (
		<>
			{conversations?.length !== 0 ? (
				<Card
					className={`w-full rounded-none md:rounded-lg md:mt-2 ${
						theme !== 'dark' ? 'bg-white' : 'bg-gray-900'
					}`}>
					<List>
						{conversations === null ? (
							<div className='w-full flex justify-center items-center'>
								<Spinner className='w-10 h-10' />
							</div>
						) : (
							conversations?.length > 0 &&
							conversations?.map((conversation, index) => (
								<ConversationItmes
									key={index}
									conversation={conversation}
								/>
							))
						)}
					</List>
				</Card>
			) : (
				<div className='flex justify-center p-5'>
					<Typography
						variant='h5'
						className='mb-2 text-blue-gray-600 uppercase'>
						No mesage here
					</Typography>
				</div>
			)}
		</>
	);
};

export default ConversationList;
