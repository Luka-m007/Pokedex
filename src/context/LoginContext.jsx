import { createContext, useState, useEffect } from 'react'

export const LoginContext = createContext({})

const LOGIN_KEY = 'isLoggedIn'

export const LoginProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem(LOGIN_KEY) === 'true')

	useEffect(() => {
		localStorage.setItem(LOGIN_KEY, isLoggedIn)
	}, [isLoggedIn])

	return <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</LoginContext.Provider>
}
