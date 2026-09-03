import { useFetchData } from '../../hooks'
import { PokemonInteractionCard } from '../shared'
import styled from 'styled-components'

const NoFavoritesText = styled.div`
	text-align: center;
	margin-top: 20px;
	font-size: 3rem;
	padding: 20px;
`

export const Favorite = () => {
	const { filteredData } = useFetchData({ onlyFavorites: true })

	return (
		<>
			{filteredData.length > 0 ? (
				<PokemonInteractionCard pokemons={filteredData} />
			) : (
				<NoFavoritesText>
					Brak ulubionych Pokemonów, przejdź do strony głównej i dodaj swoje ulubione Pokemony.
				</NoFavoritesText>
			)}
		</>
	)
}
