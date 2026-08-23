import { useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { HeaderLink, RegisterModal } from '../index'
import pokemonLogo from '../icons/pokemonLogo.png'

// const headerLinks = ['Ulubione', 'Arena', 'Ranking', 'Edycja']

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
	const [register, setRegister] = useState(false)

	const modal = createPortal(<RegisterModal onClose={() => setRegister(false)} />, document.body)

	const handleRegisterClick = () => {
		setRegister(!register)
	}

	return (
		<HeaderWrapper>
			<Img src={pokemonLogo} alt='Pokemon Logo'></Img>
			<HeaderLinkWrapper>
				{/* {headerLinks.map(link => (
					<HeaderLink key={link}>{link}</HeaderLink>
				))} */}
				<HeaderLink onClick={handleRegisterClick}>Rejestracja</HeaderLink>
			</HeaderLinkWrapper>
			{register && modal}
		</HeaderWrapper>
	)
}
