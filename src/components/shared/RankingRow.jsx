import styled from 'styled-components'

export const Wrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	font-weight: bold;
`
export const Column = styled.div`
	border: 1px solid ${({ theme }) => theme.border};
	padding: 10px;
	color: ${({ theme }) => theme.text};
`
export const RankingRow = ({ pokemon, rank, img }) => {
	return (
		<Wrapper>
			<Column>
				<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
					{rank} <img src={img} alt={pokemon.name} style={{ width: '50px', height: '50px' }} />
				</div>
			</Column>
			<Column>{pokemon.base_experience}</Column>
			<Column>{pokemon.height}</Column>
			<Column>{pokemon.weight}</Column>
			<Column>{pokemon.win || 0}</Column>
		</Wrapper>
	)
}
