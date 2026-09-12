import styled from 'styled-components'
import { CloseWindow, ModalTitle } from '../shared'

const Backdrop = styled.div`
	position: fixed;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	backdrop-filter: blur(1rem);
	padding: 2rem;
`

const ModalContent = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 3rem;
	width: 100%;
	max-width: 40rem;
	padding: 5rem 3rem 3rem;
	border-radius: 0.8rem;
	max-height: 90vh;
	overflow-y: auto;
	background-color: ${({ theme }) => theme.surface};
	color: ${({ theme }) => theme.text};
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
