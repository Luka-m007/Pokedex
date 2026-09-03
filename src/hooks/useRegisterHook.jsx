import { useActionAsync } from '../hooks'

const BASE_URL = 'http://localhost:3001/'

export const useRegisterHook = () => {
	const {
		executeAction: registerUser,
		isLoading,
		error,
		success,
	} = useActionAsync(async formData => {
		const { confirmPassword, ...userToSave } = formData
		const response = await fetch(`${BASE_URL}users`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userToSave),
		})
		if (!response.ok) throw new Error('Failed to register user')
	})

	return { registerUser, isLoading, error, success }
}
