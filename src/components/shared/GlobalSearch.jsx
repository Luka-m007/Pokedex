import styled from 'styled-components'

const InputWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #68aeef;
	padding: 3rem;
`
const Input = styled.input`
	width: 100%;
	max-width: 30rem;
	padding: 1rem;
	font-size: 1.5rem;
	border-radius: 5px;
	border: 1px solid #787878;
	background-color: transparent;

	&:focus {
		outline: none;
		box-shadow: 0 0 5px #68aeef;
	}
`

export const GlobalSearch = ({ value, onChange }) => {
	return (
		<InputWrapper>
			<Input type='text' placeholder='Search' value={value} onChange={e => onChange(e.target.value)} />
		</InputWrapper>
	)
}
