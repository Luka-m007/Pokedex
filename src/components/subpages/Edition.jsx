import { useState } from 'react'
import { createPortal } from 'react-dom'
import { NewEditPokemonModal, Button } from '../shared'
import { ImgContainer, Column, Wrapper, HeaderColumn, Img, TableHead } from '../../services/tableStyles'
import { useFetchData } from '../../hooks'
import styled from 'styled-components'

const tableHeaders = ['Lp.', 'Name', 'Actions']

const RankingWrapper = styled.div`
	padding: 20px;
`
const EditionWrapper = styled(Wrapper)`
	grid-template-columns: repeat(3, 1fr);
`

export const Edition = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedPokemon, setSelectedPokemon] = useState(null)
	const { filteredData } = useFetchData()

	const NewEditPokemonModall = createPortal(
		<NewEditPokemonModal onClose={() => setIsModalOpen(false)} pokemon={selectedPokemon} />,
		document.body,
	)

	return (
		<>
			<Button
				onClick={() => {
					setSelectedPokemon(null)
					setIsModalOpen(true)
				}}>
				Stwórz pokemona
			</Button>
			{isModalOpen && NewEditPokemonModall}

			<RankingWrapper>
				<TableHead>
					<EditionWrapper>
						{tableHeaders.map((header, index) => (
							<HeaderColumn key={index}>{header}</HeaderColumn>
						))}
					</EditionWrapper>
				</TableHead>
				
				{filteredData?.map((pokemon, index) => (
					<EditionWrapper key={pokemon.id}>
						<Column data-label='Lp.'>
							<ImgContainer>
								{index + 1} <Img src={pokemon.sprites?.front_default} alt={`Pokemon ${pokemon.id}`} />
							</ImgContainer>
						</Column>
						<Column key={`name-${index}`}>{pokemon.name}</Column>
						<Column key={`actions-${index}`}>
							<Button
								onClick={() => {
									setSelectedPokemon(pokemon)
									setIsModalOpen(true)
								}}>
								Edytuj
							</Button>
						</Column>
					</EditionWrapper>
				))}
			</RankingWrapper>
		</>
	)
}
