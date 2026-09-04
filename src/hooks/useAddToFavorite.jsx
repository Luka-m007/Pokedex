import { useActionAsync } from '../hooks'
import { FetchDataContext } from '../context'
import { updateCustomPokemonField } from '../services'
import { useContext } from 'react'

export const useAddToFavorite = () => {
	const { toggleFavorite } = useContext(FetchDataContext)

	const {
		error,
		isLoading,
		success,
		executeAction: addToFavorite,
	} = useActionAsync(async (id, isFavorite) => {
		id = Number(id)
		await updateCustomPokemonField(id, { isFavorite })
		toggleFavorite(id, isFavorite)
	})

	return { addToFavorite, isLoading, error, success }
}
