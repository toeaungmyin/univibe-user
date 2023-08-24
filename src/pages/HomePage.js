import React from 'react';
import Posts from '../components/Section/Post/Posts';
import PostCreateCard from '../components/Section/Post/PostCreate/PostCreateCard';

const HomePage = () => {
	return (
		<>
			<div className="w-full h-full flex flex-col gap-2 overflow-auto no-scrollbar md:px-4 py-2">
				<PostCreateCard />
				<Posts />
			</div>
		</>
	);
};

export default HomePage;
