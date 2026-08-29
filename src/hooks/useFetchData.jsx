import { useState, useEffect } from 'react'
import { useActionAsync } from '../index'

const API_URL = 'https://pokeapi.co/api/v2/pokemon/'
const LOCAL_DATA_URL = 'http://localhost:3001/'
const PAGE_SIZE = 10

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

export const useFetchData = () => {
	const { isLoading, error, data, executeAction: fetchData } = useActionAsync(fetchPokemonData)
	const [page, setPage] = useState(1)
	const [searchInput, setSearchInput] = useState('')

	useEffect(() => {
		fetchData().catch(err => {
			console.error('Błąd pobierania danych:', err)
		})
	}, [fetchData])

	const handleSearchInputChange = value => {
		setSearchInput(value)
		setPage(1)
	}

	const allData = data || []
	const filteredData = allData.filter(pokemon => pokemon.name.toLowerCase().includes(searchInput.toLowerCase()))
	const totalFilteredPages = Math.ceil(filteredData.length / PAGE_SIZE)
	const paginatedData = filteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

	return {
		paginatedData,
		error,
		isLoading,
		page,
		setPage,
		totalFilteredPages,
		handleSearchInputChange,
		searchInput,
	}
}
