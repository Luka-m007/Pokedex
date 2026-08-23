import { useFetchData, PokemonCard, PaginationCustom, GlobalSearch } from '../../index'
import styled from 'styled-components'

const HomeWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
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
			{isLoading && <p>Loading...</p>}
			{error && <p>Error occurred!</p>}
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
