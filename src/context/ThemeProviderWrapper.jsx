import { createContext, useState, useContext } from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { lightTheme, darkTheme } from '../services'

const ThemeContext = createContext()

const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        transition: background-color 0.25s linear;
    }
`

export const ThemeProviderWrapper = ({ children }) => {
	const [isDark, setIsDark] = useState(false)

	return (
		<ThemeContext.Provider value={{ isDark, setIsDark }}>
			<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
				<GlobalStyle />
				{children}
			</ThemeProvider>
		</ThemeContext.Provider>
	)
}

export const useThemeMode = () => useContext(ThemeContext)
