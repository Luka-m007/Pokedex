import { HeaderContent, Home } from './index'
import { SnackbarProvider } from 'notistack'
import { LoginProvider } from './context/LoginContext'
import { Outlet } from 'react-router-dom'

export function App() {
	return (
		<>
			<LoginProvider>
				<SnackbarProvider maxSnack={1} preventDuplicate>
					<HeaderContent />
					{/* <Home /> */}
					<Outlet />
				</SnackbarProvider>
			</LoginProvider>
		</>
	)
}
