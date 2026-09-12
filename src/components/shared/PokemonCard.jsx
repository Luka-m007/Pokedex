import { WinLoseCard } from '../shared'
import styled from 'styled-components'

export const Card = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: linear-gradient(to bottom, ${({ theme }) => theme.surface}, ${({ theme }) => theme.surfaceAlt});
	color: ${({ theme }) => theme.text};
	border-radius: 1rem;
	gap: 1rem;
	padding: 5rem 1rem;
`

export const Img = styled.img`
	width: 20rem;
	height: 30rem;
`

export const StatisticsWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	justify-items: center;
	row-gap: 1.4rem;
	column-gap: 10rem;
	padding: 0 1rem;

	@media (max-width: 768px) {
		column-gap: 2rem;
	}
`
export const StaticsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
`
export const H2 = styled.h2`
	font-size: 2.7rem;

	@media (max-width: 768px) {
		font-size: 2.4rem;
	}
`

export const P = styled.p`
	font-size: 1.4rem;
	color: ${({ theme }) => theme.textSecondary};

	@media (max-width: 768px) {
		font-size: 1.2rem;
	}
`

export const Span = styled.span`
	font-size: 1.7rem;
	font-weight: bold;
	white-space: nowrap;

	@media (max-width: 768px) {
		font-size: 1.5rem;
	}
`

export const InfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 2rem;
`

export const PokemonCard = ({ pokemon, children, className, showStats = true }) => {
	return (
		<Card className={className}>
			{showStats && pokemon.win !== undefined && <WinLoseCard pokemon={pokemon} />}
			{children}
			<Img src={pokemon.sprites?.other?.dream_world?.front_default || pokemon.image} alt={pokemon.name} />
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
