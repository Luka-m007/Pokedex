import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Notification } from '../../services'
import { useLoginHook } from '../../hooks'
import { Button, InputForm } from '../shared'

const loginSchema = z.object({
	email: z.string().email({ message: 'Nieprawidłowy adres email' }),
	password: z.string().min(8, { message: 'Hasło musi składać się conajmniej z 8 znaków' }),
})

export const LoginForm = ({ onSubmitted }) => {
	const { login, error, success } = useLoginHook()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(loginSchema),
	})

	const onSubmit = async data => {
		try {
			await login(data)
		} catch (error) {
			console.error('Błąd logowania:', error)
		}
	}

	useEffect(() => {
		if (success) {
			onSubmitted()
		}
	}, [success, onSubmitted])

	const notificationMessage = () => {
		if (success) {
			return (
				<Notification variant='success' autoHideDuration={1000}>
					Logowanie zakończone sukcesem!
				</Notification>
			)
		}

		if (error) {
			return (
				<Notification variant='error' autoHideDuration={1000}>
					Nieprawidłowy email lub hasło
				</Notification>
			)
		}
		return null
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<InputForm
				id='email'
				label='Email'
				type='email'
				placeholder='Wpisz swój email'
				{...register('email')}
				error={errors.email?.message}
			/>
			<InputForm
				id='password'
				label='Hasło'
				type='password'
				placeholder='Wpisz swoje hasło'
				{...register('password')}
				error={errors.password?.message}
			/>

			{notificationMessage()}
			<Button type='submit'>Zaloguj</Button>
		</form>
	)
}
