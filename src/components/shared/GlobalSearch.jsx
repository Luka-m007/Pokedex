import styled from 'styled-components'

const InputWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.primary};
	padding: 3rem;
`
const Input = styled.input`
	width: 100%;
	max-width: 30rem;
	padding: 1rem;
	font-size: 1.5rem;
	border-radius: 0.8rem;
	border: 1px solid ${({ theme }) => theme.border};
	background-color: transparent;
	color: #fff;

	&::placeholder {
		color: rgba(255, 255, 255, 0.75);
	}

	&:focus {
		outline: none;
		box-shadow: 0 0 5px ${({ theme }) => theme.primaryHover};
	}
`

export const GlobalSearch = ({ value, onChange }) => {
	return (
		<InputWrapper>
			<Input type='text' placeholder='Search' value={value} onChange={e => onChange(e.target.value)} />
		</InputWrapper>
	)
}
