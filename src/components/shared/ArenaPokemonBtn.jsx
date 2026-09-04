import { SwordIcon } from '../../icons/SwordIcon'
import styled from 'styled-components'

const Wrapper = styled.div`
	position: absolute;
	top: 1.2rem;
	left: 5.2rem;
	display: flex;
	align-items: center;
	gap: 0.5rem;
`

const StyledSwordIcon = styled(SwordIcon)`
	width: 2.4rem;
	height: 2.4rem;
	padding: 0.8rem;
	box-sizing: content-box;
	cursor: pointer;
	cursor: ${({ $isFull }) => ($isFull ? 'not-allowed' : 'pointer')};
	color: ${({ $isFull, $isOnArena }) => ($isFull ? '#a0a0a0' : $isOnArena ? '#f80015' : '#0a0a0a')};
`

const CountText = styled.span`
	position: relative;
	display: block;
	font-size: 1.6rem;
	font-weight: bold;
	color: #0a0a0a;
`

export const ArenaPokemonBtn = ({ onClick, isOnArena, isArenaFull, limit, count }) => {
	return (
		<Wrapper>
			<StyledSwordIcon onClick={onClick} $isOnArena={isOnArena} $isFull={isArenaFull} />
			<CountText>
				{count}/{limit}
			</CountText>
		</Wrapper>
	)
}
