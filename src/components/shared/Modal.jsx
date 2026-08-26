import styled from 'styled-components'
import { CloseWindow, ModalTitle } from '../../index'

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

export const Modal = ({ title, onClose, children }) => {
	return (
		<Backdrop>
			<ModalContent onClick={e => e.stopPropagation()}>
				<CloseWindow onClick={onClose} />
				{title && <ModalTitle>{title}</ModalTitle>}
				{children}
			</ModalContent>
		</Backdrop>
	)
}
