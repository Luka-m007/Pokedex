import { useFetchData, useAddToArena, useFightArena } from '../../hooks'
import { useState } from 'react'
import { ArenaSlot, Button } from '../shared'
import styled from 'styled-components'

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 3rem;
	height: 100vh;
	padding: 4rem;

	@media (max-width: 768px) {
		height: auto;
		flex-direction: column;
		gap: 1.5rem;
		padding: 1rem;
	}

	@media (min-width: 769px) and (max-width: 1024px) {
		flex-direction: row;
		gap: 2rem;
		padding: 2rem;
	}
`

const ResultWrapper = styled.div`
	position: absolute;
	top: 30%;
	left: 50%;
	display: flex;
	flex-direction: column;
	align-items: center;
	transform: translate(-50%, -50%);
	padding: 5rem 10rem;
	background-color: ${({ theme }) => theme.surfaceAlt};
	font-size: 3rem;
	font-weight: bold;
	color: ${({ theme }) => theme.text};
	border-radius: 10px;
`

const EndButton = styled(Button)`
	margin-top: 2rem;
`

export const Arena = () => {
	const [fightResult, setFightResult] = useState(null)
	const { filteredData } = useFetchData({ onlyArena: true })
	const { addToArena } = useAddToArena()
	const { fight } = useFightArena()

	const handleRemoveFromArena = pokemonId => {
		try {
			addToArena(pokemonId, false)
			setFightResult(null)
		} catch (error) {
			console.error('Error removing from arena:', error)
		}
	}

	const handleFight = async () => {
		try {
			const result = await fight(filteredData[0], filteredData[1])
			setFightResult(result)
		} catch (error) {
			console.error('Error during fight:', error)
		}
	}

	const handleClearArenaSlot = () => {
		handleRemoveFromArena(filteredData[0].id)
		handleRemoveFromArena(filteredData[1].id)
	}

	const isSlot0Loser = !!fightResult && !fightResult.draw && fightResult.loser === filteredData[0].id
	const isSlot1Loser = !!fightResult && !fightResult.draw && fightResult.loser === filteredData[1].id

	return (
		<>
			<Wrapper>
				<ArenaSlot pokemon={filteredData[0]} onRemove={handleRemoveFromArena} isLoser={isSlot0Loser} />
				<Button disabled={filteredData.length < 2} onClick={handleFight}>
					WALCZ !
				</Button>
				<ArenaSlot pokemon={filteredData[1]} onRemove={handleRemoveFromArena} isLoser={isSlot1Loser} />
			</Wrapper>
			{fightResult && (
				<ResultWrapper>
					{fightResult.draw ? (
						<p>Walka zakończyła się remisem!</p>
					) : (
						<p>Zwycięzca: {filteredData.find(pokemon => pokemon.id === fightResult.winner).name}</p>
					)}
					<EndButton onClick={handleClearArenaSlot}>Opuść arenę</EndButton>
				</ResultWrapper>
			)}
		</>
	)
}
