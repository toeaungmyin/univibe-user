import React, { useEffect, useRef, useState } from 'react';
import { CommentForm } from './CommentForm';
import Comment from './Comment';
import { deleteCommentRequest } from '../../../service/Post';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../../../features/auth/PostSlice';
import { updateUserPost } from '../../../features/auth/UserSlice';

const CommentBox = ({ post }) => {
	const containerRef = useRef(null);
	const posts = useSelector(state => state.postReducer.posts.data);
	const selectedUserPost = useSelector(state => state.userReducer.userPosts);
	const dispatch = useDispatch();
	const [isDeletingComment, setDeletingComment] = useState(null);
	// Function to scroll the container to the bottom
	const scrollToBottom = () => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	};

	const deleteComment = async commentId => {
		try {
			setDeletingComment(commentId);
			const response = await deleteCommentRequest(commentId);
			if (response.status === 200) {
				const updatedPost = response.data.post;
				if (posts) {
					const updatedPosts = [...posts];
					const postIndex = updatedPosts.findIndex(
						post => post.id === updatedPost.id
					);

					if (postIndex !== -1) {
						updatedPosts[postIndex] = updatedPost;
					}
					dispatch(updatePost(updatedPosts));
				}

				if (selectedUserPost?.data) {
					const updatedUserPosts = [...selectedUserPost?.data];
					const userPostIndex = updatedUserPosts.findIndex(
						p => p.id === updatedPost.id
					);
					if (userPostIndex !== -1) {
						updatedUserPosts[userPostIndex] = updatedPost;
						// Dispatch the updatedUserPost action with the updated data
						dispatch(updateUserPost(updatedUserPosts));
					}
				}
			}
		} catch (error) {
			console.log(error);
		} finally {
			setDeletingComment(null);
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
				ref={containerRef}>
				{post?.comments &&
					post.comments.map((comment, index) => (
						<Comment
							key={index}
							comment={comment}
							deleteComment={deleteComment}
							isDeletingComment={isDeletingComment}
						/>
					))}
			</div>
			<CommentForm post={post} />
		</div>
	);
};

export default CommentBox;
