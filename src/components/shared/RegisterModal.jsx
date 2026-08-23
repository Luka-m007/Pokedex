import { RegistrationForm } from './RegistrationForm'
import styled from 'styled-components'

const Backdrop = styled.div`
	position: fixed;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 30px;
	justify-content: center;
	width: 100%;
	height: 100%;
	backdrop-filter: blur(10px);
	left: 0;
	top: 0;
`

const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 50px;
	border-radius: 8px;
	max-height: 90vh;
	background-color: #fff;
`

export const RegisterModal = ({ onClose }) => {
	return (
		<Backdrop>
			<ModalContent onClick={e => e.stopPropagation()}>
				<RegistrationForm onSubmitted={onClose} />
			</ModalContent>
		</Backdrop>
	)
}
