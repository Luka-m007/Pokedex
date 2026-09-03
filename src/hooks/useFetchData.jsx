import { useState, useContext } from 'react'
import { FetchDataContext } from '../context'

const PAGE_SIZE = 10

export const useFetchData = ({ onlyFavorites = false } = {}) => {
	const { data: allData, isLoading, error } = useContext(FetchDataContext)
	const [page, setPage] = useState(1)
	const [searchInput, setSearchInput] = useState('')

	const handleSearchInputChange = value => {
		setSearchInput(value)
		setPage(1)
	}

	const favoriteData = onlyFavorites ? allData.filter(pokemon => pokemon.isFavorite) : allData
	const filteredData = favoriteData.filter(pokemon => pokemon.name.toLowerCase().includes(searchInput.toLowerCase()))
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
		filteredData,
	}
}
