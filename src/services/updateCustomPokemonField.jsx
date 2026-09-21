const BASE_URL = 'http://localhost:3001/'

export async function updateCustomPokemonField(id, body) {
	const response = await fetch(`${BASE_URL}customPokemons/${id}`)
	if (response.ok) {
		const patchResponse = await fetch(`${BASE_URL}customPokemons/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		})
		if (!patchResponse.ok) {
			throw new Error(`Failed to update pokemon data`)
		}

		return
	}

	const postResponse = await fetch(`${BASE_URL}customPokemons`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ id, ...body }),
	})
	if (!postResponse.ok) {
		throw new Error(`Failed to update pokemon data`)
	}
}
