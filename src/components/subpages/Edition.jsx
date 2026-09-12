import { useState } from 'react'
import { createPortal } from 'react-dom'
import { NewEditPokemonModal, Button } from '../shared'
import { ImgContainer, Column, Wrapper, HeaderColumn, Img, TableHead, RankingWrapper, SectionWrapper } from '../../services/tableStyles'
import { useFetchData } from '../../hooks'
import styled from 'styled-components'

const tableHeaders = ['Lp.', 'Name', 'Actions']

const EditionWrapper = styled(Wrapper)`
	grid-template-columns: repeat(3, 1fr);

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`

const EditBtn = styled(Button)`
	padding: 0.5rem 1rem;
	font-size: 1.4rem;
`

const CreateBtn = styled(Button)`
	margin-top: 2rem;
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
			<SectionWrapper>
				<CreateBtn
					onClick={() => {
						setSelectedPokemon(null)
						setIsModalOpen(true)
					}}>
					Stwórz pokemona
				</CreateBtn>
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
							<Column data-label='Name' key={`name-${index}`}>
								{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
							</Column>
							<Column data-label='Actions' key={`actions-${index}`}>
								<EditBtn
									onClick={() => {
										setSelectedPokemon(pokemon)
										setIsModalOpen(true)
									}}>
									Edytuj
								</EditBtn>
							</Column>
						</EditionWrapper>
					))}
				</RankingWrapper>
			</SectionWrapper>
		</>
	)
}
