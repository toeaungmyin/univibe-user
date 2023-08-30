import {
	Avatar,
	Card,
	IconButton,
	List,
	Spinner,
} from '@material-tailwind/react';
import React, { useContext, useEffect } from 'react';
import ConversationItmes from './ConversationItmes';
import { ThemeContext } from '../../../ThemeContext/ThemeContext';
import { getConversationsRequest } from '../../../service/Message';
import { useDispatch, useSelector } from 'react-redux';
import { getConversations } from '../../../features/auth/MessageSlice';
import { getChatSuggestUser } from '../../../features/auth/AuthSlice';
import { DefaultProfileAvatar } from '../../../assets/images';
import { useNavigate } from 'react-router';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const ConversationList = () => {
	const conversations = useSelector(
		state => state.messageReducer.conversations
	);
	const chatSuggestUser = useSelector(
		state => state.authReducer.chatSuggestUser
	);
	const { theme } = useContext(ThemeContext);
	const dispatch = useDispatch();
	const navigate = useNavigate();
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

	useEffect(() => {
		dispatch(getChatSuggestUser());
	}, [dispatch]);

	console.log(chatSuggestUser);

	return (
		<>
			<Card
				className={`w-full rounded-none md:rounded-lg mt-2 p-2 ${
					theme !== 'dark' ? 'bg-white' : 'bg-gray-900'
				}`}>
				<div className='flex items-center justify-start gap-3 w-full overflow-auto scroll-smooth no-scrollbar'>
					{(!chatSuggestUser || chatSuggestUser?.length < 5) && (
						<IconButton
							onClick={() => navigate('/search')}
							size='lg'
							className='text-black bg-gray-900/10 rounded-full shadow-none hover:shadow-none focus:shadow-none'>
							<MagnifyingGlassIcon className='w-6 h-6' />
						</IconButton>
					)}
					{chatSuggestUser &&
						chatSuggestUser.map((user, index) =>
							user?.profile_url ? (
								<Avatar
									onClick={() =>
										navigate(`/chats/${user.id}`)
									}
									key={index}
									variant='circular'
									size='md'
									alt='tania andrew'
									className='border border-blue-500 p-0.5'
									onError={e =>
										(e.target.src = DefaultProfileAvatar)
									}
									src={user?.profile_url}
								/>
							) : (
								<Avatar
									onClick={() =>
										navigate(`/chats/${user.id}`)
									}
									key={index}
									variant='circular'
									size='md'
									alt='tania andrew'
									className='border border-blue-500 p-0.5'
									src={DefaultProfileAvatar}
								/>
							)
						)}
				</div>
			</Card>
			{conversations && conversations.length !== 0 && (
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
			)}
		</>
	);
};

export default ConversationList;
