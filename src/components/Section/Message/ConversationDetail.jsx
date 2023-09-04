import { Card } from '@material-tailwind/react';
import React, { useContext, useEffect, useRef } from 'react';
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

	const containerRef = useRef(null);
	const scrollToBottom = () => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	};

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
			className={`h-full md:h-[calc(100%-1.2rem)] rounded-none overflow-hidden md:rounded-lg md:mt-2 flex flex-col justify-between ${
				theme !== 'dark' ? 'bg-white' : 'bg-gray-900'
			}`}>
			<ConversationHeader />
			<div className='h-[calc(100%-4rem)] flex flex-col justify-end'>
				<MessageList
					containerRef={containerRef}
					scrollToBottom={scrollToBottom}
				/>
				<MessageForm scrollToBottom={scrollToBottom} />
			</div>
		</Card>
	);
};

export default ConversationDetail;
