import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.jsx'
import { ThemeProviderWrapper } from './context/ThemeProviderWrapper.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home, PokemonDetails, Arena, Edition, Favorite, Ranking, ROUTES } from './components/subpages/index.js'

const router = createBrowserRouter([
	{
		element: <App />,
		path: '/',
		children: [
			{
				element: <Home />,
				path: ROUTES.home,
			},
			{
				element: <PokemonDetails />,
				path: ROUTES.pokemonDetails(':id'),
			},
			{
				element: <Arena />,
				path: ROUTES.arena,
			},
			{
				element: <Edition />,
				path: ROUTES.edition,
			},
			{
				element: <Favorite />,
				path: ROUTES.favorite,
			},
			{
				element: <Ranking />,
				path: ROUTES.ranking,
			},
		],
	},
])

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ThemeProviderWrapper>
			<RouterProvider router={router} />
		</ThemeProviderWrapper>
	</StrictMode>,
)
