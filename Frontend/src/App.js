import React from 'react';
import './App.css';
import {
	// BrowserRouter
	HashRouter,
} from 'react-router-dom';
import Routesr from './routes/routes';

function App() {
	return (
		<HashRouter basename="/">
			<Routesr />
		</HashRouter>
	);
}

export default App;
