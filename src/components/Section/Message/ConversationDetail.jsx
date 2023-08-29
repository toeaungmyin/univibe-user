import { Card } from '@material-tailwind/react';
import React, { useContext, useEffect } from 'react';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import ConversationHeader from './ConversationHeader';
import { ThemeContext } from '../../../ThemeContext/ThemeContext';
import { getUserDetail } from '../../../service/User';
import { getSelectedUser } from '../../../features/auth/UserSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

const ConversationDetail = ({ conversation }) => {
	

	const { theme } = useContext(ThemeContext);
	const dispatch = useDispatch();
	const { userId } = useParams();

	useEffect(() => {
		const fetchUserDetail = async () => {
			try {
				const response = await getUserDetail(userId);
				dispatch(getSelectedUser(response.data));
			} catch (error) {
				console.log(error);
			}
		};
		fetchUserDetail();

		return () => {
			dispatch(getSelectedUser(null));
		};
	}, [dispatch, userId]);
	return (
		<Card
			className={`w-full h-full md:h-[calc(100%-1.3rem)] rounded-none overflow-hidden md:rounded-lg md:mt-2 flex flex-col justify-between ${
				theme !== 'dark' ? 'bg-white' : 'bg-gray-900'
			}`}>
			<ConversationHeader />
			<div className='flex flex-col justify-end'>
				<MessageList />
				<MessageForm />
			</div>
		</Card>
	);
};

export default ConversationDetail;
