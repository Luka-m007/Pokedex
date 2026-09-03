import { PaginationCustom, Notification } from '../../services'
import { useFetchData } from '../../hooks'
import { GlobalSearch, PokemonInteractionCard } from '../shared'

export const Home = () => {
	const { error, isLoading, paginatedData, page, setPage, totalFilteredPages, handleSearchInputChange, searchInput } =
		useFetchData()
	return (
		<>
			<GlobalSearch value={searchInput} onChange={handleSearchInputChange} />
			{isLoading ? (
				<Notification variant='info' closeLoading>
					Loading data...
				</Notification>
			) : (
				<PokemonInteractionCard pokemons={paginatedData} />
			)}
			{error && (
				<Notification variant='error' autoHideDuration={3000}>
					Błąd podczas pobierania danych. Sprawdź połączenie z internetem lub spróbuj ponownie później.
				</Notification>
			)}
			{/* // <PokemonInteractionCard pokemons={paginatedData} /> */}
			<PaginationCustom count={totalFilteredPages} page={page} onChange={(e, value) => setPage(value)} />
		</>
	)
}
