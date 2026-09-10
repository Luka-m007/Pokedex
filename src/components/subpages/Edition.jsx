import { useState } from 'react'
import { createPortal } from 'react-dom'
import { NewPokemonModal, Button } from '../shared'
// import { useFetchData } from '../../hooks'
// import styled from 'styled-components'

// const tableHeaders = ['Lp.', 'Name', 'Image', 'Actions']

// const RankingWrapper = styled.div`
// 	padding: 20px;
// `
// const Wrapper = styled.div`
// 	display: grid;
// 	grid-template-columns: repeat(5, 1fr);
// 	font-weight: bold;
// `
// const Column = styled.div`
// 	border: 1px solid ${({ theme }) => theme.border};
// 	padding: 10px;
// 	color: ${({ theme }) => theme.text};
// `

export const Edition = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	// const { filteredData } = useFetchData()

	const NewPokemonModall = createPortal(<NewPokemonModal onClose={() => setIsModalOpen(false)} />, document.body)

	// console.log('Filtered Data:', filteredData)

	return (
		<>
			<Button onClick={() => setIsModalOpen(true)}>Stwórz pokemona</Button>
			{isModalOpen && NewPokemonModall}
		</>
	)
	// <RankingWrapper>
	// 	<Wrapper>
	// 		{tableHeaders.map((header, index) => (
	// 			<Column key={index}>{header}</Column>
	// 		))}
	// 	</Wrapper>
	// 	{filteredData?.map((pokemon, index) => (
	// 		<Wrapper key={pokemon.id}>
	// 			<Column key={index}>{index + 1}</Column>
	// 			<Column key={`name-${index}`}>{pokemon.name}</Column>
	// 			<Column key={`image-${index}`}>
	// 				<img src={pokemon.sprites?.front_default} alt={`Pokemon ${pokemon.id}`} />
	// 			</Column>
	// 			<Column key={`actions-${index}`}>
	// 				<button>Edit</button>
	// 			</Column>
	// 		</Wrapper>
	// 	))}
	// </RankingWrapper>
}
