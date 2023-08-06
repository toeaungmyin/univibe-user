import React from 'react';
import { Followback } from './Follow/FollowBack';
import { Follow } from './Follow/Follow';

const RightSidebar = () => {
	return (
		<div className="flex flex-col gap-4 p-4 overflow-auto no-scrollbar max-h-full ">
			<Followback />
			<Follow />
		</div>
	);
};

export default RightSidebar;
