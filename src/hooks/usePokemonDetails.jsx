import { useActionAsync } from './useActionAsync'
import { useEffect } from 'react'

const API_URL = 'https://pokeapi.co/api/v2/pokemon/'
const LOCAL_DATA_URL = 'http://localhost:3001/'

export const usePokemonDetails = id => {
	const {
		data: pokemon,
		isLoading,
		error,
		executeAction: fetchPokemon,
	} = useActionAsync(async () => {
		const [apiResponse, localResponse] = await Promise.all([
			fetch(`${API_URL}${id}`),
			fetch(`${LOCAL_DATA_URL}customPokemons`),
		])

		if (!localResponse.ok) {
			throw new Error('Network response was not ok!')
		}

		const localResult = await localResponse.json()
		const localPokemon = localResult.find(el => el.id === Number(id))

		console.log('localPokemon', localPokemon)

		if (!apiResponse.ok) {
			if (localPokemon) return localPokemon

			throw new Error('Pokemon not found')
		}

		const apiResult = await apiResponse.json()
		return localPokemon ? { ...apiResult, ...localPokemon } : apiResult
	})

	useEffect(() => {
		fetchPokemon().catch(() => {})
	}, [id])

	return { pokemon, isLoading, error }
}
