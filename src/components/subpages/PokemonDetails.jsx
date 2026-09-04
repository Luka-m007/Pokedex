import { useState, useContext } from 'react'
import { usePokemonDetails, useAddToFavorite, useAddToArena } from '../../hooks'
import { useParams } from 'react-router-dom'
import { FavoritePokemonBtn, ArenaPokemonBtn } from '../shared'
import { LoginContext, FetchDataContext } from '../../context'
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
	const { addToArena, success: addToArenaSuccess } = useAddToArena()
	const { isLoggedIn } = useContext(LoginContext)
	const { arenaCount } = useContext(FetchDataContext)
	const [isFavorite, setIsFavorite] = useState(false)
	const [favoriteStatus, setFavoriteStatus] = useState(null)
	const [arenaLimitCount, setArenaLimitCount] = useState(0)

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

	const handleAddToArena = async () => {
		if (isArenaFull) {
			setArenaLimitCount(prev => prev + 1)
			return
		}
		try {
			await addToArena(id, !pokemon.isOnArena)
		} catch (error) {
			console.error('Error adding to arena:', error)
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

	const isArenaFull = arenaCount >= 2 && !pokemon.isOnArena

	return (
		<Wrapper>
			{addToFavoriteSuccess && (
				<Notification variant='info' autoHideDuration={1000}>
					{!isFavorite ? 'Removed from favorites' : 'Added to favorites'}
				</Notification>
			)}

			{addToArenaSuccess && (
				<Notification variant='info' autoHideDuration={1000}>
					{!pokemon.isOnArena ? 'Removed from arena' : 'Added to arena'}
				</Notification>
			)}

			{arenaLimitCount > 0 && (
				<Notification key={arenaLimitCount} variant='warning' autoHideDuration={1000}>
					Arena is full. You cannot add more than 2 Pokémon to the arena.
				</Notification>
			)}

			<BigCard pokemon={pokemon}>
				{isLoggedIn && <FavoritePokemonBtn isFavorite={isFavorite} onClick={handleAddToFavorite} />}
				{isLoggedIn && (
					<ArenaPokemonBtn
						isOnArena={pokemon.isOnArena}
						onClick={handleAddToArena}
						isArenaFull={isArenaFull}
						limit={2}
						count={arenaCount}
					/>
				)}
			</BigCard>
		</Wrapper>
	)
}
