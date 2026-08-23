import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import styled from 'styled-components'
import { InputForm } from './InputForm'
import { Button, useRegisterHook } from '../../index'

const FormWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 1rem;
`

const defaultValues = {
	firstName: '',
	email: '',
	password: '',
	confirmPassword: '',
}

const schema = z
	.object({
		firstName: z.string().min(3, { message: 'Imię musi składać się conajmniej z 3 znaków' }),
		email: z.string().email({ message: 'Nieprawidłowy adres email' }),
		password: z
			.string()
			.min(8, { message: 'Hasło musi składać się conajmniej z 8 znaków' })
			.refine(value => /[A-Z]/.test(value), { message: 'Hasło musi zawierać conajmniej jedną wielką literę' })
			.refine(value => /[0-9]/.test(value), { message: 'Hasło musi zawierać conajmniej jedną cyfrę' })
			.refine(value => /[^A-Za-z0-9]/.test(value), { message: 'Hasło musi zawierać conajmniej jeden znak specjalny' }),
		confirmPassword: z.string().min(1, { message: 'Potwierdzenie hasła jest wymagane' }),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Hasła muszą być takie same',
		path: ['confirmPassword'],
	})

export const RegistrationForm = ({ onSubmitted }) => {
	const { setRegisterUser, error, isLoading, success } = useRegisterHook()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
		defaultValues,
	})

	const onSubmit = data => {
		setRegisterUser(data)
	}

	useEffect(() => {
		if (success) {
			onSubmitted()
		}
	}, [success, onSubmitted])

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormWrapper>
				<InputForm id='firstName' type='text' label='Imię' {...register('firstName')} error={errors.firstName} />
				<InputForm id='email' type='email' label='Email' {...register('email')} error={errors.email} />
				<InputForm id='password' type='password' label='Hasło' {...register('password')} error={errors.password} />
				<InputForm
					id='confirmPassword'
					type='password'
					label='Potwierdź hasło'
					{...register('confirmPassword')}
					error={errors.confirmPassword}
				/>
			</FormWrapper>

			<Button type='submit'>Zarejestruj się</Button>
		</form>
	)
}
