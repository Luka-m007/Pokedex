import { createContext, useEffect, useState } from 'react'
import { useActionAsync } from '../hooks'

const API_URL = 'https://pokeapi.co/api/v2/pokemon/'
const LOCAL_DATA_URL = 'http://localhost:3001/'

const fetchPokemonData = async () => {
	const [apiResponse, localResponse] = await Promise.all([
		fetch(`${API_URL}?limit=150`),
		fetch(`${LOCAL_DATA_URL}customPokemons`),
	])

	if (!apiResponse.ok || !localResponse.ok) {
		throw new Error('Network response was not ok!')
	}

	const apiResult = await apiResponse.json()
	const localResult = await localResponse.json()

	const detalilResult = await Promise.all(apiResult.results.map(pokemon => fetch(pokemon.url)))

	if (detalilResult.some(response => !response.ok)) {
		throw new Error('Network response was not ok!')
	}

	const details = await Promise.all(detalilResult.map(response => response.json()))

	const combinedData = details.map(pokemon => {
		const localPokemon = localResult.find(el => el.id === pokemon.id)
		return localPokemon ? { ...pokemon, ...localPokemon } : pokemon
	})
	return combinedData
}

export const FetchDataContext = createContext({ data: [], isLoading: false, error: null })

export const FetchDataProvider = ({ children }) => {
	const [favoritePokemons, setFavoritePokemons] = useState({})
	const [arenaPokemons, setArenaPokemons] = useState({})

	const { data, isLoading, error, executeAction: fetchData } = useActionAsync(fetchPokemonData)

	useEffect(() => {
		fetchData().catch(err => {
			console.error('Error fetching data:', err)
		})
	}, [fetchData])

	const toggleFavorite = (id, isFavorite) => {
		setFavoritePokemons(prev => ({ ...prev, [id]: isFavorite }))
	}

	const toggleArena = (id, isOnArena) => {
		setArenaPokemons(prev => ({ ...prev, [id]: isOnArena }))
	}

	const mergedData = (data || []).map(pokemon => {
		const withFavorite =
			pokemon.id in favoritePokemons ? { ...pokemon, isFavorite: favoritePokemons[pokemon.id] } : pokemon
		return pokemon.id in arenaPokemons ? { ...withFavorite, isOnArena: arenaPokemons[pokemon.id] } : withFavorite
	})

	const arenaCount = mergedData.filter(pokemon => pokemon.isOnArena).length

	return (
		<FetchDataContext.Provider
			value={{ data: mergedData || [], isLoading, error, fetchData, toggleFavorite, toggleArena, arenaCount }}>
			{children}
		</FetchDataContext.Provider>
	)
}
