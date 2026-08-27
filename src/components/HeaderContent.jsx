import { useState, useContext } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { HeaderLink, RegisterModal, LoginModal, LoginContext } from '../index'
import pokemonLogo from '../icons/pokemonLogo.png'

const headerLinks = ['Ulubione', 'Arena', 'Ranking', 'Edycja']

const HeaderWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #202020;
	padding: 3rem 2rem;
`

const HeaderLinkWrapper = styled.div`
	display: flex;
	gap: 1rem;
`

const Img = styled.img`
	width: 15rem;
	cursor: pointer;
`
export const HeaderContent = () => {
	const [isRegisterOpen, setIsRegisterOpen] = useState(false)
	const [isLoginOpen, setIsLoginOpen] = useState(false)
	const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext)

	const registerModal = createPortal(<RegisterModal onClose={() => setIsRegisterOpen(false)} />, document.body)
	const loginModal = createPortal(<LoginModal onClose={() => setIsLoginOpen(false)} />, document.body)

	const handleLogout = () => {
		setIsLoggedIn(false)
		setIsLoginOpen(false)
	}

	return (
		<HeaderWrapper>
			<Img src={pokemonLogo} alt='Pokemon Logo'></Img>
			<HeaderLinkWrapper>
				{isLoggedIn && headerLinks.map(link => <HeaderLink key={link}>{link}</HeaderLink>)}
				<HeaderLink onClick={isLoggedIn ? handleLogout : () => setIsLoginOpen(true)}>
					{isLoggedIn ? 'Wyloguj' : 'Logowanie'}
				</HeaderLink>
				{!isLoggedIn && <HeaderLink onClick={() => setIsRegisterOpen(true)}>Rejestracja</HeaderLink>}
			</HeaderLinkWrapper>
			{isRegisterOpen && registerModal}
			{isLoginOpen && loginModal}
		</HeaderWrapper>
	)
}
