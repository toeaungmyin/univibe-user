import React from 'react';
import { ProfileCard } from './ProfileCard.jsx/ProfileCard';
import { LeftNavList } from './LeftNavList/LeftNavList';
import { Announcement } from './Announcement/Announcement';

const LeftSidebar = () => {
	return (
		<div className="flex flex-col p-4 gap-4 overflow-auto no-scrollbar max-h-full">
			<ProfileCard />
			<LeftNavList />
			<Announcement />
		</div>
	);
};

export default LeftSidebar;
