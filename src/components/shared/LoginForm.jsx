import { InputForm, Button } from '../../index'

export const LoginForm = ({ onSubmitted }) => {
	return (
		<div>
			<InputForm id='email' label='Email' type='email' placeholder='Wpisz swój email' />
			<InputForm id='password' label='Hasło' type='password' placeholder='Wpisz swoje hasło' />
			<Button onClick={onSubmitted}>Zaloguj</Button>
		</div>
	)
}
