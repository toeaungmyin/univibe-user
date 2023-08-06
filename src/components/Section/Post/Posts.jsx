import React from 'react';
import { PostCard } from './PostCard';

const Posts = () => {
	return (
		<div className="flex flex-col justify-center items-center gap-4">
			<PostCard />
			<PostCard />
		</div>
	);
};

export default Posts;
