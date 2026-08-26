import { createContext, useState } from 'react'

export const LoginContext = createContext({})

export const LoginPrivider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	return <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</LoginContext.Provider>
}
