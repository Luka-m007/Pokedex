import { LoginForm, Modal } from '../shared'

export const LoginModal = ({ onClose }) => (
	<Modal title='Logowanie' onClose={onClose}>
		<LoginForm onSubmitted={onClose} />
	</Modal>
)
