import { useState, useEffect } from 'react'
import { useReceivingImages } from '../../hooks'
import { useContext } from 'react'
import { FetchDataContext } from '../../context'
import { ArrowLeft } from '../../icons/ArrowLeft'
import { ArrowRight } from '../../icons/ArrowRight'
import styled from 'styled-components'

const ImageWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`

const Image = styled.img`
	width: 25rem;
	height: 25rem;
	filter: ${props => (props.$isChosen ? 'grayscale(100%)' : 'none')};
	opacity: ${props => (props.$isChosen ? '0.4' : '1')};

	@media (max-width: 768px) {
		width: 15rem;
		height: 15rem;
	}
`

const StyledArrowLeft = styled(ArrowLeft)`
	cursor: pointer;
	width: 4rem;
	height: 4rem;
`

const StyledArrowRight = styled(ArrowRight)`
	cursor: pointer;
	width: 4rem;
	height: 4rem;
`

export const ImageCarusele = ({ onChange }) => {
	const [index, setIndex] = useState(0)
	const { data, loadNextPage, loadPreviousPage, page, count } = useReceivingImages()
	const { data: existingPokemon } = useContext(FetchDataContext)
	const isStart = page === 0 && index === 0
	const currentImage = data?.[index]
	const isChosen = currentImage ? existingPokemon.some(pokemon => pokemon.id === currentImage.id) : false
	const isEnd = currentImage ? currentImage.id >= count : false

	const handleNextCount = () => {
		if (isEnd) return
		if (index === data.length - 1) {
			setIndex(0)
			loadNextPage()
		} else {
			setIndex(prev => (prev + 1) % data.length)
		}
	}

	const handlePreviousCount = () => {
		if (isStart) return
		if (index === 0) {
			setIndex(data.length - 1)
			loadPreviousPage()
		} else {
			setIndex(prev => (prev - 1 + data.length) % data.length)
		}
	}

	useEffect(() => {
		if (currentImage) onChange(currentImage)
		if (isChosen) onChange(null)
	}, [currentImage, onChange, isChosen])

	return (
		<ImageWrapper>
			<StyledArrowLeft type='button' onClick={handlePreviousCount} disabled={isStart} />
			{currentImage && <Image src={currentImage.image} alt={`Image ${currentImage.id}`} $isChosen={isChosen} />}
			<StyledArrowRight type='button' onClick={handleNextCount} disabled={isEnd} />
		</ImageWrapper>
	)
}
