import { createContext, useState, useEffect } from 'react'

export const LoginContext = createContext({})

const LOGIN_KEY = 'isLoggedIn'
const USERNAME_KEY = 'userName'

export const LoginProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem(LOGIN_KEY) === 'true')
	const [userName, setUserName] = useState(() => {
		const storedUserName = localStorage.getItem(USERNAME_KEY)
		return storedUserName ? storedUserName : ''
	})

	useEffect(() => {
		localStorage.setItem(LOGIN_KEY, isLoggedIn)
	}, [isLoggedIn])

	useEffect(() => {
		localStorage.setItem(USERNAME_KEY, userName)
	}, [userName])

	return (
		<LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, userName, setUserName }}>
			{children}
		</LoginContext.Provider>
	)
}
