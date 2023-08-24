import React from 'react';
import { ProfileCard } from './ProfileCard.jsx/ProfileCard';
import { LeftNavList } from './LeftNavList/LeftNavList';
import { Announcement } from './Announcement/Announcement';

const LeftSidebar = () => {
	return (
		<div className="flex flex-col px-4 py-2 gap-2 overflow-auto no-scrollbar max-h-full">
			<ProfileCard />
			<LeftNavList />
			<Announcement />
		</div>
	);
};

export default LeftSidebar;
