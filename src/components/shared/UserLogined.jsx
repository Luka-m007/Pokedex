import styled from 'styled-components'
import { UserIcon } from '../../icons/UserIcon'

const UserLoginedWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`

const UserIconStyled = styled(UserIcon)`
	color: #fff;
	width: 2rem;
	height: 2rem;
	margin-right: 0.5rem;
`

const UserName = styled.span`
	color: #fff;
	font-size: 1.3rem;
`

export const UserLogined = ({ userName }) => {
	return (
		<UserLoginedWrapper>
			<UserIconStyled />
			<UserName>{userName}</UserName>
		</UserLoginedWrapper>
	)
}
