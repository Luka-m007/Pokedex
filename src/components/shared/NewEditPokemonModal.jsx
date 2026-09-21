import { NewEditPokemonForm, Modal } from '.'

export const NewEditPokemonModal = ({ onClose, pokemon }) => (
	<Modal title={pokemon ? 'Edycja Pokemona' : 'Tworzenie Pokemona'} onClose={onClose}>
		<NewEditPokemonForm pokemon={pokemon} />
	</Modal>
)
