import { RegistrationForm, ModalTitle, CloseWindow } from '../../index'
import styled from 'styled-components'

// const Backdrop = styled.div`
// 	position: fixed;
// 	display: flex;
// 	flex-direction: column;
// 	align-items: center;
// 	gap: 30px;
// 	justify-content: center;
// 	width: 100%;
// 	height: 100%;
// 	backdrop-filter: blur(10px);
// 	left: 0;
// 	top: 0;
// `

const Backdrop = styled.div`
	position: fixed;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	backdrop-filter: blur(10px);
	padding: 2rem;
`

const ModalContent = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 30px;
	width: 100%;
	max-width: 40rem;
	padding: 5rem 3rem 3rem;
	border-radius: 8px;
	max-height: 90vh;
	overflow-y: auto;
	background-color: #fff;
`

// const ModalContent = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	align-items: center;
// 	padding: 50px;
// 	border-radius: 8px;
// 	max-height: 90vh;
// 	background-color: #fff;
// `

export const RegisterModal = ({ onClose }) => {
	return (
		<Backdrop>
			<ModalContent onClick={e => e.stopPropagation()}>
				<CloseWindow onClick={onClose} />
				<ModalTitle>Rejestracja</ModalTitle>
				<RegistrationForm onSubmitted={onClose} />
			</ModalContent>
		</Backdrop>
	)
}
