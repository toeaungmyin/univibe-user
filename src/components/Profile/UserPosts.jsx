import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { Spinner } from '@material-tailwind/react';
import { getNextUserPosts, getUserPosts } from '../../features/auth/UserSlice';
import { PostCard } from '../Section/Post/PostCard';
import { getUserPostsRequest } from '../../service/Post';
import { useParams } from 'react-router';

const UserPosts = () => {
	const posts = useSelector(state => state.userReducer.userPosts);
	const { userId } = useParams();
	const dispatch = useDispatch();
	const { ref, inView } = useInView({
		threshold: 0,
	});
	const [page, setPage] = useState(null);

	const fetchNextPage = async page_no => {
		try {
			const response = await getUserPostsRequest(userId, page_no);
			if (response?.status === 200) {
				const responseData = response.data;
				const nextPage = response.data.next_page;
				if (page_no === 1) {
					dispatch(getUserPosts(responseData));
				} else {
					const nextPosts = responseData.data.filter(
						npost => !posts.data.some(post => post.id === npost.id)
					);

					dispatch(getNextUserPosts([...posts.data, ...nextPosts]));
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
		return () => {
			dispatch(getUserPosts(null));
		};
	}, [inView]);

	useEffect(() => {
		fetchNextPage(1);

		return () => {
			dispatch(getUserPosts(null));
		};
	}, [dispatch, userId]);

	return (
		<>
			{posts && (
				<div className="flex flex-col justify-center items-center gap-4 mb-2">
					{posts?.data?.map((post, index) => (
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

export default UserPosts;
