import { HeaderContent, Home } from './index'
import { SnackbarProvider } from 'notistack'
import { LoginProvider } from './context/LoginContext'

export function App() {
	return (
		<>
			<LoginProvider>
				<SnackbarProvider maxSnack={1} preventDuplicate>
					<HeaderContent />
					<Home />
				</SnackbarProvider>
			</LoginProvider>
		</>
	)
}
