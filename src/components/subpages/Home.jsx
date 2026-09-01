import { useFetchData, PaginationCustom, GlobalSearch, Notification } from '../../index'
import { PokemonCard } from '../shared/PokemonCard'
import { Link } from 'react-router-dom'
import { ROUTES } from '../subpages/index'
import styled from 'styled-components'

const HomeWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
	align-items: start;
	width: 100%;
	gap: 2rem;
	padding: 2rem;
`

const HoverCard = styled(PokemonCard)`
	transition: transform 0.3s ease-in-out;
	cursor: pointer;

	&:hover {
		transform: scale(1.05);
	}
`

const LinkStyled = styled(Link)`
	text-decoration: none;
	color: inherit;
`

export const Home = () => {
	const { error, isLoading, paginatedData, page, setPage, totalFilteredPages, handleSearchInputChange, searchInput } =
		useFetchData()
	return (
		<>
			<GlobalSearch value={searchInput} onChange={handleSearchInputChange} />
			{/* {isLoading && <p>Loading...</p>} */}
			{isLoading && (
				<Notification variant='info' autoHideDuration={400}>
					Loading data...
				</Notification>
			)}
			{error && (
				<Notification variant='error' autoHideDuration={3000}>
					Błąd podczas pobierania danych. Sprawdź połączenie z internetem lub spróbuj ponownie później.
				</Notification>
			)}
			{paginatedData && (
				<HomeWrapper>
					{paginatedData.map(pokemon => (
						<div key={pokemon.id}>
							<LinkStyled to={ROUTES.pokemonDetails(pokemon.id)}>
								<HoverCard key={pokemon.id} pokemon={pokemon} />
							</LinkStyled>
						</div>
					))}
				</HomeWrapper>
			)}

			<PaginationCustom count={totalFilteredPages} page={page} onChange={(e, value) => setPage(value)} />
		</>
	)
}
