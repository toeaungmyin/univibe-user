import { createContext, useState } from 'react';

export const MenuContext = createContext();
export const MenuContextProvider = ({ children }) => {
	const [isMenuOpen, setMenuOpen] = useState(false);

	const openMenu = () => setMenuOpen(true);
	const closeMenu = () => setMenuOpen(false);

	return (
		<MenuContext.Provider value={{ isMenuOpen, openMenu, closeMenu }}>
			{children}
		</MenuContext.Provider>
	);
};
