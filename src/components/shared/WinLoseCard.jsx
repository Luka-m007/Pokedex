import styled from 'styled-components'

const CardWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.header};
	color: white;
	padding: 1rem;
	border-radius: 1rem 0 1rem 0;
`
const Span = styled.span`
	font-size: 1.5rem;
	font-weight: bold;
`

export const WinLoseCard = ({ pokemon }) => {
	return (
		<CardWrapper>
			<Span>W: {pokemon.win}</Span>
			<Span>L: {pokemon.lose}</Span>
		</CardWrapper>
	)
}
