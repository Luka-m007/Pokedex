import { XIcon } from '../../icons/XIcon'
import styled from 'styled-components'

const CloseIcon = styled(XIcon)`
	position: absolute;
	top: 1.2rem;
	left: 1.2rem;
	width: 2.4rem;
	height: 2.4rem;
	padding: 0.8rem;
	box-sizing: content-box;
	cursor: pointer;
	border-radius: 50%;
	transition: background-color 0.2s ease;
`

export const CloseWindow = ({ onClick }) => {
	return <CloseIcon onClick={onClick} />
}
