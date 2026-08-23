import styled from 'styled-components'

const InputDiv = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 1rem;
`

const Label = styled.label`
	display: block;
	margin-bottom: 5px;
	font-weight: 300;
	font-size: 1.5rem;
`

const Input = styled.input`
	padding: 10px;
	border-radius: 5px;
	border: 1px solid #ccc;
`

export const InputForm = ({ id, label, error, ...rest }) => {
	return (
		<InputDiv>
			<Label htmlFor={id}>{label}</Label>
			<Input id={id} {...rest} />
			{error && <span>{error.message}</span>}
		</InputDiv>
	)
}
