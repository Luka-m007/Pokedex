import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'

export const Notification = ({ children, variant = 'error', autoHideDuration }) => {
	useEffect(() => {
		if (children) {
			enqueueSnackbar(children, {
				variant,
				autoHideDuration,
				anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
			})
		}
	}, [children, variant, autoHideDuration])

	return null
}
