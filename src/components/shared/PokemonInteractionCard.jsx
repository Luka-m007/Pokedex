import { PokemonCard } from '../shared'
import { Link } from 'react-router-dom'
import { ROUTES } from '../subpages'
import styled from 'styled-components'

const HomeWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(40rem, 1fr));
	align-items: start;
	width: 100%;
	gap: 2rem;
	max-width: 1920px;
	margin: 0 auto;
	padding: 2rem;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`

const HoverCard = styled(PokemonCard)`
	transition: transform 0.3s ease-in-out;
	cursor: pointer;

	&:hover {
		transform: scale(1.05);
	}
`

const LinkStyled = styled(Link)`
	text-decoration: none;
	color: inherit;
`

export const PokemonInteractionCard = ({ pokemons }) => {
	return (
		<HomeWrapper>
			{pokemons.map(pokemon => (
				<LinkStyled key={pokemon.id} to={ROUTES.pokemonDetails(pokemon.id)}>
					<HoverCard pokemon={pokemon} />
				</LinkStyled>
			))}
		</HomeWrapper>
	)
}
