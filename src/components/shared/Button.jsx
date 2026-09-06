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

	&:disabled {
		background-color: #999;
		cursor: not-allowed;
	}
`

export const Button = ({ children, ...rest }) => {
	return <Btn {...rest}>{children}</Btn>
}
