export const FetchAndMergeLocal = async (url, localResult) => {
	const response = await Promise.all(url.map(el => fetch(el)))
	if (response.some(res => !res.ok)) {
		throw new Error('Network response was not ok!')
	}

	const details = await Promise.all(response.map(res => res.json()))

	const combinedData = details.map(pokemon => {
		const localPokemon = localResult.find(el => el.id === pokemon.id)
		return localPokemon ? { ...pokemon, ...localPokemon } : pokemon
	})
	return combinedData
}
