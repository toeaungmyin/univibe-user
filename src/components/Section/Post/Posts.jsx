import React, { useEffect, useState } from 'react';
import { PostCard } from './PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { postsRequest } from '../../../server/Post';
import { getNextPosts, getPosts } from '../../../features/auth/PostSlice';
import { useInView } from 'react-intersection-observer';
import { Spinner, Typography } from '@material-tailwind/react';

const Posts = () => {
	const posts = useSelector(state => state.postReducer.posts);
	const dispatch = useDispatch();
	const { ref, inView } = useInView({
		threshold: 0,
	});
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	const fetchNextPage = async () => {
		setIsLoading(true);
		try {
			const response = await postsRequest(page);
			if (response?.status === 200) {
				if (posts) {
					dispatch(getNextPosts([...posts.data, ...response.data.data]));
				} else {
					dispatch(getPosts(response.data));
				}
				if (response.data.last_page !== response.data.next_page) {
					setPage(response.data.next_page);
				} else {
					setPage(null);
				}
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (inView && page !== null) {
			fetchNextPage();
			console.log(page);
		}
		console.log(inView);
		console.log(page);
	}, [inView]);

	useEffect(() => {
		fetchNextPage();
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

					<div
						ref={ref}
						className="flex justify-center items-center"
					>
						{isLoading ? (
							<Spinner
								className="h-16 w-16"
								color="cyan"
							/>
						) : (
							<Typography
								variant="h3"
								color="gray"
								textGradient
							>
								No More Posts
							</Typography>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default Posts;
