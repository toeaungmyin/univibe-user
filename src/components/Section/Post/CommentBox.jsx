import React, { useEffect, useRef } from 'react';
import { CommentForm } from './CommentForm';
import Comment from './Comment';

const CommentBox = ({ post }) => {
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
	}, [post.comments]);
	return (
		<div className='p-2'>
			<div
				className='max-h-72 flex flex-col gap-2 p-2 overflow-scroll no-scrollbar'
				ref={containerRef}
			>
				{post?.comments &&
					post.comments.map((comment, index) => (
						<Comment
							key={index}
							comment={comment}
						/>
					))}
			</div>
			<CommentForm post={post} />
		</div>
	);
};

export default CommentBox;
