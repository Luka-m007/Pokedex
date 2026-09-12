import pokemonLogo from '../../assets/pokemonLogo.png'
import { PokemonCard, Img, StatisticsWrapper } from '../shared/PokemonCard'
import { CloseWindow } from '../shared'
import styled from 'styled-components'

const PokemonImg = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
	opacity: 0.3;
`

const PlaceholderCard = styled.div`
	width: 45rem;
	height: 50rem;
	background-color: ${({ theme }) => theme.surfaceAlt};
	border-radius: 2rem;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

	@media (max-width: 768px) {
		width: 30rem;
		height: 40rem;
	}

	@media (min-width: 769px) and (max-width: 1024px) {
		width: 40rem;
		height: 45rem;
	}
`
const PokemonArenaSmall = styled(PokemonCard)`
	position: relative;
	width: 45rem;
	height: 50rem;
	opacity: ${({ $isLoser }) => ($isLoser ? 0.3 : 1)};
	padding: 2rem;

	@media (max-width: 768px) {
		width: 30rem;
		height: 40rem;
	}
	@media (min-width: 769px) and (max-width: 1024px) {
		width: 40rem;
		height: 45rem;
	}

	${Img} {
		width: 30rem;
		height: 30rem;

		@media (max-width: 768px) {
			width: 20rem;
			height: 20rem;
		}
		@media (min-width: 769px) and (max-width: 1024px) {
			width: 25rem;
			height: 25rem;
		}
	}

	${StatisticsWrapper} {
		column-gap: 3rem;
		row-gap: 0.6rem;
	}
`

export const ArenaSlot = ({ pokemon, onRemove, isLoser }) => {
	return (
		<>
			{pokemon ? (
				<PokemonArenaSmall pokemon={pokemon} $isLoser={isLoser} showStats={false}>
					<CloseWindow onClick={() => onRemove(pokemon.id)} />
				</PokemonArenaSmall>
			) : (
				<PlaceholderCard>
					<PokemonImg src={pokemonLogo} alt='Pokemon Logo' />
				</PlaceholderCard>
			)}
		</>
	)
}
