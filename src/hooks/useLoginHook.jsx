import { LoginContext, useActionAsync } from '../index'
import { useContext } from 'react'

const BASE_URL = 'http://localhost:3001/'

export const useLoginHook = () => {
	const { setIsLoggedIn, setUserName } = useContext(LoginContext)

	const {
		isLoading,
		error,
		executeAction: login,
		success,
	} = useActionAsync(async ({ email, password }) => {
		const response = await fetch(`${BASE_URL}users?email=${email}`)
		if (!response.ok) throw new Error('Failed to fetch user data')
		const users = await response.json()
		const matchingUser = users.find(user => user.password === password)
		if (!matchingUser) throw new Error('Invalid email or password')
		setIsLoggedIn(true)
		setUserName(matchingUser.firstName)
	})

	return { isLoading, error, login, success }
}
