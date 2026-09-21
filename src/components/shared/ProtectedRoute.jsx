import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { LoginContext } from '../../context'
import { ROUTES } from '../subpages/routes'

export const ProtectedRoute = () => {
	const { isLoggedIn } = useContext(LoginContext)

	return isLoggedIn ? <Outlet /> : <Navigate to={ROUTES.home} replace />
}
