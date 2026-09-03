import { useState, useContext } from 'react'
import { usePokemonDetails, useAddToFavorite } from '../../hooks'
import { useParams } from 'react-router-dom'
import { FavoritePokemonBtn } from '../shared'
import { LoginContext } from '../../context'
import { Notification } from '../../services'
import { PokemonCard, Img, InfoWrapper, StatisticsWrapper, StaticsWrapper, H2, P, Span } from '../shared/PokemonCard'
import styled from 'styled-components'

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	padding: 3rem 10rem;
	min-height: 100vh;
`

const BigCard = styled(PokemonCard)`
	position: relative;
	justify-content: center;
	gap: 5rem;
	flex-direction: row;

	${InfoWrapper} {
		gap: 3rem;
	}

	${Img} {
		width: 30rem;
	}

	${StatisticsWrapper} {
		gap: 5rem;
	}

	${StaticsWrapper} {
		gap: 0.7rem;
	}

	${H2} {
		font-size: 4rem;
	}

	${P} {
		font-size: 1.4rem;
	}

	${Span} {
		font-size: 1.7rem;
	}
`

export const PokemonDetails = () => {
	const { id } = useParams()
	const { pokemon, error } = usePokemonDetails(id)
	const { addToFavorite, success: addToFavoriteSuccess } = useAddToFavorite()
	const [isFavorite, setIsFavorite] = useState(false)
	const [favoriteStatus, setFavoriteStatus] = useState(null)
	const { isLoggedIn } = useContext(LoginContext)

	if (pokemon && favoriteStatus === null) {
		setIsFavorite(pokemon.isFavorite)
		setFavoriteStatus(pokemon.isFavorite)
	}

	const handleAddToFavorite = async () => {
		try {
			await addToFavorite(id, !isFavorite)
			setIsFavorite(!isFavorite)
		} catch (error) {
			console.error('Error adding to favorites:', error)
		}
	}

	if (!pokemon && !error) {
		return (
			<Notification variant='info' autoHideDuration={400}>
				Loading ...
			</Notification>
		)
	}

	if (error) {
		return (
			<Notification variant='error' autoHideDuration={400}>
				Error while fetching data.
			</Notification>
		)
	}

	return (
		<Wrapper>
			{addToFavoriteSuccess && (
				<Notification variant='info' autoHideDuration={1000}>
					{!isFavorite ? 'Removed from favorites' : 'Added to favorites'}
				</Notification>
			)}

			<BigCard pokemon={pokemon}>
				{isLoggedIn && <FavoritePokemonBtn isFavorite={isFavorite} onClick={handleAddToFavorite} />}
			</BigCard>
		</Wrapper>
	)
}
