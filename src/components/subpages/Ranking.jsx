import { useFetchData } from '../../hooks'
import {
	ImgContainer,
	Column,
	Wrapper,
	HeaderColumn,
	Img,
	TableHead,
	RankingWrapper,
	SectionWrapper,
} from '../../services/tableStyles'
import { useState } from 'react'
import styled from 'styled-components'

const sortLabels = ['Lp.', 'Base Experience', 'Height', 'Weight', 'Wins']

const SortSelect = styled.select`
	display: block;
	margin: 0 auto;
	width: 100%;
	max-width: 23.6rem;
	margin-bottom: 2rem;
	padding: 0.5rem 1rem;
	font-size: 1.6rem;
	border-radius: 0.8rem;

	option {
		font-size: 1.6rem;
	}
`

export const Ranking = () => {
	const [sortBy, setSortBy] = useState('base_experience')
	const { filteredData } = useFetchData()

	const filteredAndSortedData = filteredData.sort((a, b) => (b[sortBy] || 0) - (a[sortBy] || 0))

	const handleSortChange = event => {
		setSortBy(event.target.value)
	}

	return (
		<SectionWrapper>
			<RankingWrapper>
				<SortSelect value={sortBy} onChange={handleSortChange}>
					<option value='base_experience'>Base Experience</option>
					<option value='height'>Height</option>
					<option value='weight'>Weight</option>
					<option value='win'>Wins</option>
				</SortSelect>

				<TableHead>
					<Wrapper>
						{sortLabels.map((label, index) => (
							<HeaderColumn key={index}>{label}</HeaderColumn>
						))}
					</Wrapper>
				</TableHead>

				{filteredAndSortedData.map((pokemon, id) => (
					<Wrapper key={id}>
						<Column data-label='Lp.'>
							<ImgContainer>
								{id + 1} <Img src={pokemon.sprites?.front_default} alt={`Pokemon ${pokemon.id}`} />
							</ImgContainer>
						</Column>
						<Column data-label='Base Experience'>{pokemon.base_experience}</Column>
						<Column data-label='Height'>{pokemon.height}</Column>
						<Column data-label='Weight'>{pokemon.weight}</Column>
						<Column data-label='Wins'>{pokemon.win || 0}</Column>
					</Wrapper>
				))}
			</RankingWrapper>
		</SectionWrapper>
	)
}
