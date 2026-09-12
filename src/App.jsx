import { HeaderContent } from './components/HeaderContent'
import { SnackbarProvider } from 'notistack'
import { LoginProvider, FetchDataProvider } from './context'
import { Outlet } from 'react-router-dom'

export function App() {
	return (
		<>
			<LoginProvider>
				<SnackbarProvider maxSnack={1}>
					<FetchDataProvider>
						<HeaderContent />
						<Outlet />
					</FetchDataProvider>
				</SnackbarProvider>
			</LoginProvider>
		</>
	)
}
