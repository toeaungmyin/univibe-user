import React from 'react';
import './PreLoader.css';
import { TextLogo } from '../../assets/images';

const PreLoader = () => {
	return (
		<div className="w-full h-screen flex flex-col justify-center items-center bg-blue-gray-50">
			<img
				className="md:w-80 w-72 object-contain"
				width={'100%'}
				height={'100%'}
				src={TextLogo}
				alt="logo"
			/>
			<div className="progress"></div>
		</div>
	);
};

export default PreLoader;
