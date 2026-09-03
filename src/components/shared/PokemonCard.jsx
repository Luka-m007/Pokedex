import styled from 'styled-components'

export const Card = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: linear-gradient(to bottom, #f5f5f5, #e0e0e0);
	border-radius: 1rem;
	gap: 1rem;
	padding: 2rem 1rem;
`

export const Img = styled.img`
	width: 20rem;
`

export const StatisticsWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	justify-items: center;
	row-gap: 1rem;
	padding: 0 1rem;
`
export const StaticsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
`
export const H2 = styled.h2`
	font-size: 2rem;
`

export const P = styled.p`
	font-size: 1rem;
	color: #7c7c7c;
`

export const Span = styled.span`
	font-size: 1.4rem;
	font-weight: bold;
	white-space: nowrap;
`

export const InfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 2rem;
`


export const PokemonCard = ({ pokemon, children, className }) => {
	return (
		<Card className={className}>
			{children}
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
	)
}
