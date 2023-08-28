import { createContext, useState } from "react";

export const ThemeContext = createContext();
export const ThemeContextProvider = ( {children}) =>{
    const [theme, setTheme] = useState(localStorage.getItem("theme"));
    
    const toggleTheme = () => {
			if (theme === 'dark') {
				setTheme('light');
				localStorage.setItem('theme', 'light');
			} else {
				setTheme('dark');
				localStorage.setItem('theme', 'dark');
			}
		};
		return (
			<ThemeContext.Provider value={{ theme, toggleTheme }}>
				{children}
			</ThemeContext.Provider>
		);
}