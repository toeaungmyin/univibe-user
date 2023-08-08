import React, { useEffect } from 'react';
import { PostCard } from './PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { postsRequest } from '../../../server/Post';
import { getPosts } from '../../../features/auth/PostSlice';

const Posts = () => {
	const posts = useSelector(state => state.postReducer.posts);
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchUser = async () => {
			await postsRequest()
				.then(response => {
					if (response?.status === 200) {
						dispatch(getPosts(response.data));
					}
				})
				.catch(error => {
					console.log(error);
				});
		};
		fetchUser();
	}, [dispatch]);

	return (
		<>
			{posts && (
				<div className="flex flex-col justify-center items-center gap-4">
					{posts.data.map((post, index) => (
						<PostCard
							key={index}
							post={post}
						/>
					))}
				</div>
			)}
		</>
	);
};

export default Posts;
