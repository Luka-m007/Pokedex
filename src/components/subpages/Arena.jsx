import { useFetchData } from '../../hooks'
import { PokemonInteractionCard } from '../shared'
import styled from 'styled-components'

const NoArenaText = styled.div`
	text-align: center;
	margin-top: 20px;
	font-size: 3rem;
	padding: 20px;
`

export const Arena = () => {
	const { filteredData } = useFetchData({ onlyArena: true })

	return (
		<>
			{filteredData.length > 0 ? (
				<PokemonInteractionCard pokemons={filteredData} />
			) : (
				<NoArenaText>
					Brak pokemonów na arenie. Przejdź do strony głównej i dodaj swojego pokemona do areny.
				</NoArenaText>
			)}
		</>
	)
}
