import React from 'react';
import ConversationList from '../components/Section/Message/ConversationList';

const MessagePage = () => {
	return (
		<div className='w-full h-full overflow-auto no-scrollbar md:px-6'>
			<ConversationList />
		</div>
	);
};

export default MessagePage;
