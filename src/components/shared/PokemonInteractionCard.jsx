import { PokemonCard } from '../shared/PokemonCard'
import { Link } from 'react-router-dom'
import { ROUTES } from '../subpages/index'
import styled from 'styled-components'

const HomeWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
	align-items: start;
	width: 100%;
	gap: 2rem;
	padding: 2rem;
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
