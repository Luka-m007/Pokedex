import { useActionAsync } from '../hooks'
import { FetchDataContext } from '../context'
import { useEffect, useContext } from 'react'

const API_URL = 'https://pokeapi.co/api/v2/pokemon/'
const LOCAL_DATA_URL = 'http://localhost:3001/'

export const usePokemonDetails = id => {
	const { data: allData } = useContext(FetchDataContext)
	const cachedPokemon = allData.find(el => el.id === Number(id))

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
		if (!cachedPokemon) {
			fetchPokemon().catch(() => {})
		}
	}, [id, cachedPokemon, fetchPokemon])

	return {
		pokemon: cachedPokemon || pokemon,
		isLoading: !cachedPokemon && (isLoading || (!pokemon && !error)),
		error: cachedPokemon ? null : error,
	}
}
