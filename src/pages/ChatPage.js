import React from 'react';
import ConversationDetail from '../components/Section/Message/ConversationDetail';

const ChatPage = () => {
	return (
		<div className='w-full h-full overflow-auto no-scrollbar md:px-6'>
			<ConversationDetail />
		</div>
	);
};

export default ChatPage;
