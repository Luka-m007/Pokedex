import { useFetchData } from '../../hooks/useFetchData'
import { PokemonInteractionCard } from '../shared/PokemonInteractionCard'

export const Favorite = () => {
	const { filteredData } = useFetchData({ onlyFavorites: true })

	return <PokemonInteractionCard pokemons={filteredData} />
}
