import { useEffect, useState } from 'react'
import { usePokemonDetails, useAddToFavorite } from '../../hooks/index'
import { useParams } from 'react-router-dom'
import { FavoritePokemonBtn } from '../../index'
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

const InfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 3rem;
	/* padding: 3rem 10rem; */
`

const Card = styled.div`
	position: relative;
	width: 100%;
	/* max-width: 30rem; */
	display: flex;
	align-items: center;
	justify-content: center;
	background: linear-gradient(to bottom, #fbfafa, #e0e0e0);
	gap: 5rem;
	border-radius: 1rem;
	padding: 2rem 1rem;
`

const Img = styled.img`
	width: 30rem;
`

const StatisticsWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	justify-items: center;
	gap: 5rem;
	padding: 0 1rem;
`
const StaticsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.7rem;
`
const H2 = styled.h2`
	font-size: 4rem;
`

const P = styled.p`
	font-size: 1.4rem;
	color: #7c7c7c;
`

const Span = styled.span`
	font-size: 1.7rem;
	font-weight: bold;
	white-space: nowrap;
`

export const PokemonDetails = () => {
	const { id } = useParams()
	const { pokemon, isLoading, error } = usePokemonDetails(id)
	const { addToFavorite } = useAddToFavorite()
	const [isFavorite, setIsFavorite] = useState(false)

	useEffect(() => {
		if (pokemon) {
			setIsFavorite(pokemon.isFavorite)
		}
	}, [pokemon])

	const handleAddToFavorite = async () => {
		try {
			await addToFavorite(id, !isFavorite)
			setIsFavorite(!isFavorite)
		} catch (error) {
			console.error('Error adding to favorites:', error)
		}
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error || !pokemon) {
		return <div>Error</div>
	}

	return (
		<Wrapper>
			<Card>
				<FavoritePokemonBtn isFavorite={isFavorite} onClick={handleAddToFavorite} />
				<Img src={pokemon.sprites.front_default} alt={pokemon.name} />
				<InfoWrapper>
					<H2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</H2>
					<StatisticsWrapper>
						<StaticsWrapper>
							<P>{pokemon.height}</P>
							<Span>Height</Span>
						</StaticsWrapper>

						<StaticsWrapper>
							<P>{pokemon.base_experience}</P>
							<Span>Base Experience</Span>
						</StaticsWrapper>
						<StaticsWrapper>
							<P>{pokemon.weight}</P>
							<Span>Weight</Span>
						</StaticsWrapper>
						<StaticsWrapper>
							<P>{pokemon.abilities.map(el => (el.is_hidden === false ? el.ability.name : ''))}</P>
							<Span>Abilities</Span>
						</StaticsWrapper>
					</StatisticsWrapper>
				</InfoWrapper>
			</Card>
		</Wrapper>
	)
}
