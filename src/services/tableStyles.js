import styled from 'styled-components'

export const Wrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	align-items: center;
	font-weight: bold;
	background-color: ${({ theme }) => theme.surface};
	border: 1px solid ${({ theme }) => theme.border};

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		border-radius: 1rem;
		margin-bottom: 1rem;
		overflow: hidden;
	}
`
export const Column = styled.div`
	padding: 1rem;
	font-weight: normal;
	font-size: 1.4rem;
	color: ${({ theme }) => theme.text};

	@media (max-width: 768px) {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid ${({ theme }) => theme.border};

		&::before {
			content: attr(data-label);
			font-weight: bold;
			color: ${({ theme }) => theme.textSecondary};
		}
	}
`

export const Img = styled.img`
	width: 5rem;
	height: 5rem;
	object-fit: cover;
	border-radius: 50%;
	background-color: ${({ theme }) => theme.surfaceAlt};
`

export const ImgContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`

export const HeaderColumn = styled(Column)`
	background-color: ${({ theme }) => theme.header};
	color: ${({ theme }) => theme.headerText};
	border: none;
`
export const TableHead = styled.div`
	@media (max-width: 768px) {
		display: none;
	}
`
export const RankingWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 2rem;
	width: 100%;
	max-width: 1920px;
	margin: 0 auto;
`
export const SectionWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`
