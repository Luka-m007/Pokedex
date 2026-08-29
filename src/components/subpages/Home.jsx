import { useFetchData, PokemonCard, PaginationCustom, GlobalSearch, Notification } from '../../index'
import styled from 'styled-components'

const HomeWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
	align-items: start;
	width: 100%;
	gap: 2rem;
	padding: 2rem;
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
							<PokemonCard key={pokemon.id} pokemon={pokemon} />
						</div>
					))}
				</HomeWrapper>
			)}

			<PaginationCustom count={totalFilteredPages} page={page} onChange={(e, value) => setPage(value)} />
		</>
	)
}
