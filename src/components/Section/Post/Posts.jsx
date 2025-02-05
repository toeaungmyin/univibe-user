import React, { useEffect, useState } from 'react';
import { PostCard } from './PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { postsRequest } from '../../../service/Post';
import { getNextPosts, getPosts } from '../../../features/auth/PostSlice';
import { useInView } from 'react-intersection-observer';
import { Spinner } from '@material-tailwind/react';

const Posts = () => {
	const posts = useSelector(state => state.postReducer.posts);

	const dispatch = useDispatch();
	const { ref, inView } = useInView({
		threshold: 0,
	});
	const [page, setPage] = useState(1);

	const fetchNextPage = async page_no => {
		try {
			const response = await postsRequest(page);
			if (response?.status === 200) {
				const responseData = response.data;
				const nextPage = response.data.next_page;
				if (page_no === 1) {
					dispatch(getPosts(responseData));
				} else {
					const nextPosts = responseData.data.filter(
						npost => !posts.data.some(post => post.id === npost.id)
					);

					dispatch(getNextPosts([...posts.data, ...nextPosts]));
				}
				setPage(nextPage);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (inView) {
			if (page !== null) fetchNextPage(page);
		}
	}, [inView]);

	useEffect(() => {
		fetchNextPage(1);
	}, []);

	return (
		<>
			{posts && (
				<div className="flex flex-col justify-center items-center gap-4">
					{posts.data.map((post, index) => (
						<PostCard
							key={index}
							post={post}
							posts={posts.data}
						/>
					))}

					{page && (
						<div
							ref={ref}
							className="flex justify-center items-center"
						>
							<Spinner
								className="h-12 w-12"
								color="cyan"
							/>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default Posts;
