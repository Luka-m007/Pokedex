import { useState, useCallback } from 'react'

export const useActionAsync = action => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(false)
	const [data, setData] = useState(null)

	const executeAction = useCallback(
		async (...args) => {
			setIsLoading(true)
			setError(null)
			setSuccess(false)
			setData(null)
			try {
				const result = await action(...args)
				setData(result)
				setSuccess(true)
				return result
			} catch (err) {
				setError(err)
				throw err
			} finally {
				setIsLoading(false)
			}
		},
		[action],
	)

	return { isLoading, error, success, data, executeAction }
}
