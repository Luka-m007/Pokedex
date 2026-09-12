import { Button } from '../shared'
import styled from 'styled-components'

const Btn = styled(Button)`
	@media (max-width: 768px) {
		width: 100%;
		max-width: 30rem;
		font-size: 1.2rem;
		padding: 1rem 5rem;
	}

	@media (min-width: 769px) and (max-width: 1024px) {
		font-size: 1.3rem;
		padding: 1rem 2.5rem;
	}
`

export const HeaderLink = ({ children, ...rest }) => {
	return <Btn {...rest}>{children}</Btn>
}
