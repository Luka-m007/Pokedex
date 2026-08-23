import { useState, useEffect } from 'react'

const BASE_URL = 'http://localhost:3001/'

export const useRegisterHook = () => {
	const [registerUser, setRegisterUser] = useState(false)
	const [error, setError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const { confirmPassword, ...userToSave } = registerUser

	console.log('registerUser', registerUser)
	useEffect(() => {
		const register = async () => {
			setError(false)
			setSuccess(false)
			setIsLoading(true)
			try {
				const response = await fetch(`${BASE_URL}users`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(userToSave),
				})
				if (!response.ok) {
					throw new Error('Failed to register user')
				} else {
					setSuccess(true)
				}
			} catch (error) {
				setError(true)
				console.error(error)
			} finally {
				setIsLoading(false)
			}
		}

		if (registerUser) register()
	}, [registerUser])

	return { setRegisterUser, error, isLoading, success }
}
