import React, { useEffect } from 'react';
import { userDataRequest } from '../server/Auth';
import { useDispatch } from 'react-redux';
import { getUser } from '../features/auth/AuthSlice';

const HomePage = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchUser = async () => {
			const res = await userDataRequest();
			dispatch(getUser(res.data));
			console.log(res.data);
		};
		fetchUser();
	}, []);

	return (
		<>
			<div className="">Hello</div>
		</>
	);
};

export default HomePage;
