import styled from 'styled-components'

const Title = styled.h2`
	font-size: 2.5rem;
    margin-bottom: 20px;
`
export const ModalTitle = ({ children }) => {
	return <Title>{children}</Title>
}
