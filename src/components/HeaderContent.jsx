import { useState, useContext } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { HeaderLink, RegisterModal, LoginModal, LoginContext, ThemeSwitch, useThemeMode, UserLogined } from '../index'
import pokemonLogo from '../icons/pokemonLogo.png'
import { Link } from 'react-router-dom'
import { ROUTES } from './subpages/index.js'

const headerLinks = [
	{ name: 'Ulubione', path: ROUTES.favorite },
	{ name: 'Arena', path: ROUTES.arena },
	{ name: 'Ranking', path: ROUTES.ranking },
	{ name: 'Edycja', path: ROUTES.edition },
]

const HeaderWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #202020;
	padding: 0 1.5rem 2rem;
`

const RightColumn = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`

const TopRow = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`

const HeaderLinkWrapper = styled.div`
	display: flex;
	gap: 1rem;
`

const Img = styled.img`
	padding-top: 3rem;
	width: 15rem;
	cursor: pointer;
`
export const HeaderContent = () => {
	const [isRegisterOpen, setIsRegisterOpen] = useState(false)
	const [isLoginOpen, setIsLoginOpen] = useState(false)
	const { isLoggedIn, setIsLoggedIn, userName, setUserName } = useContext(LoginContext)
	const { isDark, setIsDark } = useThemeMode()

	const registerModal = createPortal(<RegisterModal onClose={() => setIsRegisterOpen(false)} />, document.body)
	const loginModal = createPortal(<LoginModal onClose={() => setIsLoginOpen(false)} />, document.body)

	const handleLogout = () => {
		setIsLoggedIn(false)
		setIsLoginOpen(false)
		setUserName('')
	}

	return (
		<HeaderWrapper>
			<Link to='/'>
				<Img src={pokemonLogo} alt='Pokemon Logo' />
			</Link>

			<RightColumn>
				<TopRow>
					{isLoggedIn && <UserLogined userName={userName} />}
					<ThemeSwitch onClick={() => setIsDark(!isDark)} isDark={isDark} />
				</TopRow>

				<HeaderLinkWrapper>
					{isLoggedIn &&
						headerLinks.map(({ name, path }) => (
							<Link key={name} to={path}>
								<HeaderLink>{name}</HeaderLink>
							</Link>
						))}
					<HeaderLink onClick={isLoggedIn ? handleLogout : () => setIsLoginOpen(true)}>
						{isLoggedIn ? 'Wyloguj' : 'Logowanie'}
					</HeaderLink>
					{!isLoggedIn && <HeaderLink onClick={() => setIsRegisterOpen(true)}>Rejestracja</HeaderLink>}
				</HeaderLinkWrapper>
			</RightColumn>

			{isRegisterOpen && registerModal}
			{isLoginOpen && loginModal}
		</HeaderWrapper>
	)
}
