import { useActionAsync } from '../hooks'
import { FetchDataContext } from '../context'
import { updateCustomPokemonField } from '../services'
import { useContext } from 'react'

export const useAddToArena = () => {
	const { toggleArena } = useContext(FetchDataContext)

	const {
		error,
		isLoading,
		success,
		executeAction: addToArena,
	} = useActionAsync(async (id, isOnArena) => {
		id = Number(id)
		await updateCustomPokemonField(id, { isOnArena })
		toggleArena(id, isOnArena)
	})

	return { addToArena, isLoading, error, success }
}
