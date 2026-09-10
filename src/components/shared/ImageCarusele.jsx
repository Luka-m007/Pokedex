import { useState, useEffect } from 'react'
import { useReceivingImages } from '../../hooks'
import { useContext } from 'react'
import { FetchDataContext } from '../../context'
import { ArrowLeft } from '../../icons/ArrowLeft'
import { ArrowRight } from '../../icons/ArrowRight'

export const ImageCarusele = ({ onChange }) => {
	const [index, setIndex] = useState(0)
	const { data, loadNextPage, loadPreviousPage, page } = useReceivingImages()
	const { data: existingPokemon } = useContext(FetchDataContext)
	const isStart = page === 0 && index === 0
	const currentImage = data?.[index]
	const isChosen = currentImage ? existingPokemon.some(pokemon => pokemon.id === currentImage.id) : false

	const handleNextCount = () => {
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
		<div>
			<ArrowLeft onClick={handlePreviousCount} disabled={isStart} />
			{currentImage && <img src={currentImage.image} alt={`Image ${currentImage.id}`} isChosen={isChosen} />}
			<ArrowRight onClick={handleNextCount} />
		</div>
	)
}
