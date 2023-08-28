import React, { useEffect, useRef } from 'react';
import Message from './Message';

const MessageList = () => {
	const containerRef = useRef(null);

	// Function to scroll the container to the bottom
	const scrollToBottom = () => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	};

	// Scroll to the bottom whenever post.comments changes
	useEffect(() => {
		scrollToBottom();
	}, []);
	return (
		<div
			className='max-h-72 flex flex-col gap-2 p-2 overflow-scroll no-scrollbar'
			ref={containerRef}>
			<Message />
		</div>
	);
};

export default MessageList;
