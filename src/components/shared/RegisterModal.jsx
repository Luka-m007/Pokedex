import { RegistrationForm, Modal } from '../../index'

export const RegisterModal = ({ onClose }) => (
	<Modal title='Rejestracja' onClose={onClose}>
		<RegistrationForm onSubmitted={onClose} />
	</Modal>
)
