import { HeaderContent, Home } from './index'
import { SnackbarProvider } from 'notistack'

export function App() {
	return (
		<>
			<SnackbarProvider maxSnack={1} preventDuplicate>
				<HeaderContent />
				<Home />
			</SnackbarProvider>
		</>
	)
}
