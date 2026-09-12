import { useActionAsync } from '../hooks'
import { useState, useEffect } from 'react'

const PAGE = 10
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'

const fetchReceivingImages = async offset => {
	const response = await fetch(`${BASE_URL}?limit=${PAGE}&offset=${150 + PAGE * offset}`)
	if (!response.ok) {
		throw new Error('Network response was not ok!')
	}
	const { results } = await response.json()
	return results.map(pokemon => {
		const id = pokemon.url.split('/').filter(Boolean).pop()
		return {
			id: Number(id),
			image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
		}
	})
}

export const useReceivingImages = () => {
	const { data, isLoading, error, executeAction: fetchReceivingImagesAction } = useActionAsync(fetchReceivingImages)
	const [page, setPage] = useState(0)
	const [count, setCount] = useState(0)

	const loadNextPage = () => {
		setPage(prevPage => prevPage + 1)
	}

	const loadPreviousPage = () => {
		setPage(prevPage => Math.max(prevPage - 1, 0))
	}

	useEffect(() => {
		fetchReceivingImagesAction(page)
	}, [page, fetchReceivingImagesAction])

	useEffect(() => {
		const fetchCount = async () => {
			const newCount = await fetch(`${BASE_URL}?limit=1`)
			const { count: totalCount } = await newCount.json()
			setCount(totalCount)
		}
		fetchCount()
	}, [])

	return { data, isLoading, error, loadNextPage, loadPreviousPage, count, page }
}
