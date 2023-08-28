import { Card } from '@material-tailwind/react';
import React from 'react';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import ConversationHeader from './ConversationHeader';

const ConversationDetail = () => {
	return (
		<Card className='w-full h-full md:h-[calc(100%-1.3rem)] rounded-none md:rounded-lg md:mt-2 flex flex-col justify-between'>
			<ConversationHeader />
			<div className='flex flex-col justify-end'>
				<MessageList />
				<MessageForm />
			</div>
		</Card>
	);
};

export default ConversationDetail;
