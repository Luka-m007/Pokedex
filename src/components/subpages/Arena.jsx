import { useFetchData } from '../../hooks'
import { ArenaSlot, Button } from '../shared'
import { useAddToArena } from '../../hooks'
import styled from 'styled-components'

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 3rem;
	height: 100vh;
`

export const Arena = () => {
	const { filteredData } = useFetchData({ onlyArena: true })
	const { addToArena } = useAddToArena()

	console.log(filteredData[0])
	console.log(filteredData[1])

	const handleRemoveFromArena = pokemonId => {
		try {
			addToArena(pokemonId, false)
		} catch (error) {
			console.error('Error removing from arena:', error)
		}
	}

	return (
		<Wrapper>
			<ArenaSlot pokemon={filteredData[0]} onRemove={handleRemoveFromArena} />
			<Button disabled={filteredData.length < 2} onClick={() => console.log('Fight!')}>
				WALCZ !
			</Button>
			<ArenaSlot pokemon={filteredData[1]} onRemove={handleRemoveFromArena} />
		</Wrapper>
	)
}
