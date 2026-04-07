import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';

import Layout from './components/Layout';
import AllCatsPage from './components/pages/AllCatsPage';
import FavoritesPage from './components/pages/FavoritesPage';
import NotFound from './components/pages/NotFound';

export default function App() {

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route element={<Layout />}>
				<Route 
					path="/" 
					element={<AllCatsPage />} 
				/>
				<Route 
					path="/favorites" 
					element={<FavoritesPage />} 
				/>
				<Route 
					path="*" 
					element={<NotFound />} 
				/>
			</Route>
		),
		{
			basename: '/Cat-pinterest/'
		}
	)

	return <RouterProvider router={router} />
}