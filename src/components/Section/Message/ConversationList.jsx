import { Card, List } from '@material-tailwind/react';
import React from 'react';
import ConversationItmes from './ConversationItmes';

const ConversationList = () => {
	return (
		<Card className='w-full h-[calc(100%-1.3rem)] rounded-none md:rounded-lg md:mt-2'>
			<List>
				<ConversationItmes />
				<ConversationItmes />
				<ConversationItmes />
			</List>
		</Card>
	);
};

export default ConversationList;
