import { updateCustomPokemonField } from '../services'
import { FetchDataContext } from '../context'
import { useContext } from 'react'

export const useFightArena = () => {
	const { updatePokemonStats } = useContext(FetchDataContext)

	const fight = async (pokemon1, pokemon2) => {
		const pokemon1Score = pokemon1.base_experience * pokemon1.weight
		const pokemon2Score = pokemon2.base_experience * pokemon2.weight
		const winner = pokemon1Score > pokemon2Score ? pokemon1 : pokemon2
		const loser = pokemon1Score > pokemon2Score ? pokemon2 : pokemon1

		if (pokemon1Score === pokemon2Score) {
			return { draw: true }
		}

		await updateCustomPokemonField(winner.id, {
			base_experience: winner.base_experience + 10,
			win: (winner.win || 0) + 1,
			lose: winner.lose || 0,
		})
		await updateCustomPokemonField(loser.id, { lose: (loser.lose || 0) + 1, win: loser.win || 0 })

		updatePokemonStats(winner.id, 'base_experience', winner.base_experience + 10)
		updatePokemonStats(winner.id, 'win', (winner.win || 0) + 1)
		updatePokemonStats(winner.id, 'lose', winner.lose || 0)
		updatePokemonStats(loser.id, 'lose', (loser.lose || 0) + 1)
		updatePokemonStats(loser.id, 'win', loser.win || 0)

		return { winner: winner.id, loser: loser.id }
	}

	return { fight }
}
