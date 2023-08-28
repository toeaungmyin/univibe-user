import './App.css';
import { ThemeContextProvider } from './ThemeContext/ThemeContext';
import { MenuContextProvider } from './ThemeContext/MenuContext';
import Router from './routes';


function App() {
	return (
		<ThemeContextProvider>
			<MenuContextProvider>
				<Router />
			</MenuContextProvider>
		</ThemeContextProvider>
	);
}

export default App;
