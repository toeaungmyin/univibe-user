import React from 'react';
import { Navbar, Typography, Input } from '@material-tailwind/react';

import TextLogo from './../../assets/logo/logo-02.svg';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ProfileMenu from './ProfileMenu';

export function Header() {
	return (
		<Navbar className="mx-auto max-w-full py-2 px-4 lg:px-8 lg:py-2 rounded-none">
			<div className="flex items-center justify-between text-blue-gray-900">
				<div className="flex justify-center items-center gap-2">
					<img
						className="w-14 transition duration-150 object-contain"
						width={'100%'}
						height={'100%'}
						src={TextLogo}
						alt="logo"
					/>
					<Typography
						variant="h1"
						className="suezOne text-cyan-700 tracking-wider text-2xl"
					>
						UniVibe
					</Typography>
				</div>
				<div className="flex gap-2">
					<div className="w-72">
						<Input
							label="Search"
							icon={<MagnifyingGlassIcon className="w-5 h-5" />}
							color="cyan"
						/>
					</div>
					<ProfileMenu />
				</div>
			</div>
		</Navbar>
	);
}
