import { useFetchData } from '../../hooks'
import { RankingRow, Column, Wrapper } from '../shared'
import { useState } from 'react'
import styled from 'styled-components'

const sortLabels = ['Lp.', 'Base Experience', 'Height', 'Weight', 'Wins']

const RankingWrapper = styled.div`
	padding: 20px;
`

export const Ranking = () => {
	const [sortBy, setSortBy] = useState('base_experience')
	const { filteredData } = useFetchData()

	const filteredAndSortedData = filteredData.sort((a, b) => (b[sortBy] || 0) - (a[sortBy] || 0))

	const handleSortChange = event => {
		setSortBy(event.target.value)
	}

	return (
		<RankingWrapper>
			<select value={sortBy} onChange={handleSortChange}>
				<option value='base_experience'>Base Experience</option>
				<option value='height'>Height</option>
				<option value='weight'>Weight</option>
				<option value='win'>Wins</option>
			</select>

			<Wrapper>
				{sortLabels.map((label, index) => (
					<Column key={index}>{label}</Column>
				))}
			</Wrapper>

			{filteredAndSortedData.map((pokemon, id) => (
				<RankingRow key={id} pokemon={pokemon} rank={id + 1} img={pokemon.sprites.front_default}></RankingRow>
			))}
		</RankingWrapper>
	)
}
