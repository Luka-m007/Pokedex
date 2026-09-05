import pokemonLogo from '../../assets/pokemonLogo.png'
import { PokemonCard } from '../shared/PokemonCard'
import { CloseWindow } from '../shared'
import styled from 'styled-components'

const PokemonImg = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
	opacity: 0.3;
`

const PlaceholderCard = styled.div`
	width: 300px;
	height: 400px;
	background-color: #f0f0f0;
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`
const PokemonArenaSmall = styled(PokemonCard)`
	position: relative;
	width: 300px;
	height: 400px;
`

export const ArenaSlot = ({ pokemon, onRemove }) => {
	return (
		<>
			{pokemon ? (
				<PokemonArenaSmall pokemon={pokemon}>
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
