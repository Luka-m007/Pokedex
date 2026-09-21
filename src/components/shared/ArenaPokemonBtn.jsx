import { SwordIcon } from '../../icons/SwordIcon'
import styled from 'styled-components'

const Wrapper = styled.div`
	position: absolute;
	top: 1.2rem;
	right: 6rem;
	display: flex;
	align-items: center;
`

const StyledSwordIcon = styled(SwordIcon)`
	width: 2.7rem;
	height: 2.7rem;
	padding: 0.8rem;
	box-sizing: content-box;
	cursor: ${({ $isFull }) => ($isFull ? 'not-allowed' : 'pointer')};
	color: ${({ $isFull, $isOnArena, theme }) => ($isFull ? theme.textSecondary : $isOnArena ? theme.accent : theme.text)};
`

const CountText = styled.span`
	position: relative;
	display: block;
	font-size: 1.8rem;
	font-weight: bold;
	color: ${({ theme }) => theme.text};
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
