import styled from 'styled-components'

const InputWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #d3d3d3;
`

export const GlobalSearch = ({ value, onChange }) => {
	return (
		<InputWrapper>
			<input type='text' value={value} onChange={e => onChange(e.target.value)} />
		</InputWrapper>
	)
}
