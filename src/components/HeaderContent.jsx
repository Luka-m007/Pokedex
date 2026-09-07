import { useState, useContext } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { LoginContext, useThemeMode } from '../context'
import { ThemeSwitch } from '../services'
import { HeaderLink, LoginModal, RegisterModal, UserLogined } from '../components/shared'
import pokemonLogo from '../assets/PokemonLogo.png'
import { HamburgerIcon } from '../icons/HamburgerIcon'
import { Link } from 'react-router-dom'
import { ROUTES } from './subpages'

const headerLinks = [
	{ name: 'Ulubione', path: ROUTES.favorite },
	{ name: 'Arena', path: ROUTES.arena },
	{ name: 'Ranking', path: ROUTES.ranking },
	{ name: 'Edycja', path: ROUTES.edition },
]

// const HeaderWrapper = styled.div`
// 	display: flex;
// 	align-items: center;
// 	justify-content: space-between;
// 	background-color: ${({ theme }) => theme.header};
// 	color: ${({ theme }) => theme.headerText};
// 	padding: 0 1.5rem 2rem;

// 	@media (max-width: 768px) {
// 		padding: 2rem 1rem;
// 	}
// `

const HeaderWrapper = styled.div`
	background-color: ${({ theme }) => theme.header};
	color: ${({ theme }) => theme.headerText};
`

const HeaderInner = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	max-width: 1920px;
	margin: 0 auto;
	padding: 0 1.5rem 2rem;

	@media (max-width: 768px) {
		padding: 2rem 1rem;
	}
`

const RightColumn = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;

	@media (max-width: 768px) {
		align-items: center;
		flex-direction: row;
	}
`

const TopRow = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`

const HeaderLinkWrapper = styled.div`
	display: flex;
	gap: 1rem;

	@media (max-width: 768px) {
		top: 0;
		left: 0;
		position: fixed;
		height: 100%;
		width: 100%;
		background-color: ${({ theme }) => theme.header};
		flex-direction: column;
		transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '-100%')});
		transition: transform 0.3s ease-in-out;
		z-index: 999;
		align-items: center;

		padding: 5rem;
	}
`

const Img = styled.img`
	padding-top: 3rem;
	width: 15rem;
	cursor: pointer;

	@media (max-width: 768px) {
		padding-top: 0rem;
		width: 10rem;
	}

	@media (min-width: 769px) and (max-width: 1024px) {
		width: 12rem;
	}
`

const HamburgerIconBtn = styled(HamburgerIcon)`
	display: none;
	cursor: pointer;
	transition: transform 0.3s ease-in-out;

	@media (max-width: 768px) {
		display: block;
	}
`

const LinkMobile = styled(Link)`
	@media (max-width: 768px) {
		display: flex;
		justify-content: center;
		width: 100%;
		max-width: 300px;
	}
`

export const HeaderContent = () => {
	const [isRegisterOpen, setIsRegisterOpen] = useState(false)
	const [isLoginOpen, setIsLoginOpen] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const { isLoggedIn, setIsLoggedIn, userName, setUserName } = useContext(LoginContext)
	const { isDark, setIsDark } = useThemeMode()

	const registerModal = createPortal(<RegisterModal onClose={() => setIsRegisterOpen(false)} />, document.body)
	const loginModal = createPortal(<LoginModal onClose={() => setIsLoginOpen(false)} />, document.body)

	const navigate = useNavigate()

	const handleLogout = () => {
		navigate('/')

		setIsLoggedIn(false)
		setIsLoginOpen(false)
		setIsMenuOpen(false)
		setUserName('')
	}

	const handleMenuClick = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	return (
		<HeaderWrapper>
			<HeaderInner>
				<Link to='/'>
					<Img src={pokemonLogo} alt='Pokemon Logo' />
				</Link>

				<RightColumn>
					<TopRow>
						{isLoggedIn && <UserLogined userName={userName} />}
						<ThemeSwitch onClick={() => setIsDark(!isDark)} isDark={isDark} />
					</TopRow>
					<HamburgerIconBtn onClick={handleMenuClick} />

					<HeaderLinkWrapper $isOpen={isMenuOpen}>
						{isLoggedIn &&
							headerLinks.map(({ name, path }) => (
								<LinkMobile key={name} to={path}>
									<HeaderLink onClick={() => setIsMenuOpen(false)}>{name}</HeaderLink>
								</LinkMobile>
							))}
						<HeaderLink
							onClick={
								isLoggedIn
									? handleLogout
									: () => {
											setIsLoginOpen(true)
											setIsMenuOpen(false)
										}
							}>
							{isLoggedIn ? 'Wyloguj' : 'Logowanie'}
						</HeaderLink>
						{!isLoggedIn && (
							<HeaderLink
								onClick={() => {
									setIsRegisterOpen(true)
									setIsMenuOpen(false)
								}}>
								Rejestracja
							</HeaderLink>
						)}
					</HeaderLinkWrapper>
				</RightColumn>

				{isRegisterOpen && registerModal}
				{isLoginOpen && loginModal}
			</HeaderInner>
		</HeaderWrapper>
	)
}
