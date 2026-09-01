import { useActionAsync } from '../index'

const BASE_URL = 'http://localhost:3001/'

export const useAddToFavorite = () => {
	const {
		error,
		isLoading,
		success,
		executeAction: addToFavorite,
	} = useActionAsync(async (id, isFavorite) => {
		id = Number(id)

		const response = await fetch(`${BASE_URL}customPokemons/${id}`)
		if (response.ok) {
			const patchResponse = await fetch(`${BASE_URL}customPokemons/${id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ isFavorite }),
			})
			if (!patchResponse.ok) {
				throw new Error('Failed to update favorite status')
			}
			return
		}

		const postResponse = await fetch(`${BASE_URL}customPokemons`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id, isFavorite }),
		})
		if (!postResponse.ok) {
			throw new Error('Failed to add to favorites')
		}
	})

	return { addToFavorite, isLoading, error, success }
}
