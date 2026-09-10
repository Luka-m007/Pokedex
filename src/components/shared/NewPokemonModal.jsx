import { NewPokemonForm, Modal } from '../shared'

export const NewPokemonModal = ({ onClose }) => (
	<Modal title='Nowy Pokemon' onClose={onClose}>
		<NewPokemonForm onSubmitted={onClose} />
	</Modal>
)
