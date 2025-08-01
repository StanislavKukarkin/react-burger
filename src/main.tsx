import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/components/app/app';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './services/store';

createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter basename='/react-burger'>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);
