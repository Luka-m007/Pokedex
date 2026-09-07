import styled from 'styled-components'

const Btn = styled.button`
	background-color: ${({ theme }) => theme.primary};
	color: #fff;
	border-radius: 5px;
	font-size: 1.5rem;
	text-align: center;
	padding: 10px 40px;
	cursor: pointer;
	text-transform: uppercase;
	border: none;

	&:hover {
		background-color: ${({ theme }) => theme.primaryHover};
	}

	@media (max-width: 768px) {
		width: 100%;
		max-width: 300px;
		font-size: 1.2rem;
		padding: 15px 50px;
	}

	@media (min-width: 769px) and (max-width: 1024px) {
		font-size: 1.3rem;
		padding: 10px 25px;
	}
`

export const HeaderLink = ({ children, ...rest }) => {
	return <Btn {...rest}>{children}</Btn>
}
