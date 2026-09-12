import { RegistrationForm, Modal } from '../shared'

export const RegisterModal = ({ onClose }) => (
	<Modal title='Rejestracja' onClose={onClose}>
		<RegistrationForm onSubmitted={onClose} />
	</Modal>
)
