import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { ThemeProviderWrapper } from './context/ThemeProviderWrapper'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home, PokemonDetails, Arena, Edition, Favorite, Ranking, ROUTES } from './components/subpages/index'
import { ProtectedRoute } from './components/shared/ProtectedRoute'

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
				element: <ProtectedRoute />,
				children: [
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
