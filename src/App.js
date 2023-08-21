import './App.css';
import { ThemeContextProvider } from './ThemeContext';
import Router from './routes';

function App() {
	return(
	<ThemeContextProvider>
		<Router/>
	</ThemeContextProvider>
	)
}

export default App;
