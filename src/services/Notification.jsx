import { enqueueSnackbar, closeSnackbar } from 'notistack'
import { useEffect } from 'react'

export const Notification = ({ children, variant = 'error', autoHideDuration, closeLoading = false }) => {
	useEffect(() => {
		if (!children) return

		const key = enqueueSnackbar(children, {
			variant,
			autoHideDuration,
			anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
		})

		if (closeLoading) {
			return () => {
				closeSnackbar(key)
			}
		}
	}, [children, variant, autoHideDuration, closeLoading])

	return null
}
