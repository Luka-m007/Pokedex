import { useFetchData, PaginationCustom, GlobalSearch, Notification } from '../../index'
import { PokemonInteractionCard } from '../shared/PokemonInteractionCard'

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
			<PokemonInteractionCard pokemons={paginatedData} />

			<PaginationCustom count={totalFilteredPages} page={page} onChange={(e, value) => setPage(value)} />
		</>
	)
}
