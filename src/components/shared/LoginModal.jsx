import { LoginForm, Modal } from '../../index'

export const LoginModal = ({ onClose }) => (
	<Modal title='Logowanie' onClose={onClose}>
		<LoginForm onSubmitted={onClose} />
	</Modal>
)
