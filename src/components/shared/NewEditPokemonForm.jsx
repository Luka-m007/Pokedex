import { useState, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FetchDataContext } from '../../context'
import { useActionAsync } from '../../hooks'
import { updateCustomPokemonField, Notification } from '../../services'
import { ImageCarusele, Button, InputForm } from '.'
import styled from 'styled-components'

const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const ButtonSubmit = styled(Button)`
	margin-top: 2.4rem;
`

const FormWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`

const schema = z.object({
	name: z.string().min(1, 'Nazwa jest wymagana'),
	height: z.coerce.number().min(1, 'Wzrost jest wymagany'),
	weight: z.coerce.number().min(1, 'Waga jest wymagana'),
	base_experience: z.coerce.number().min(1, 'Doświadczenie bazowe jest wymagane'),
})

export const NewEditPokemonForm = ({ pokemon }) => {
	const { fetchData } = useContext(FetchDataContext)
	const {
		executeAction: createPokemon,
		success,
		error,
	} = useActionAsync(async newPokemon => {
		try {
			await updateCustomPokemonField(newPokemon.id, newPokemon)
			fetchData()
			return newPokemon
		} catch (error) {
			console.error('Error creating pokemon:', error)
		}
	})
	const [selectedImage, setSelectedImage] = useState(null)
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
		defaultValues: pokemon,
	})

	useEffect(() => {
		if (!success) return
		const timeout = setTimeout(() => {
			navigate('/')
		}, 1000)
		return () => clearTimeout(timeout)
	}, [success, navigate])

	const notificationMessage = () => {
		if (success) {
			return (
				<Notification variant='success' autoHideDuration={1000}>
					{pokemon ? `Zmieniono atrybuty ${pokemon.name}` : 'Pokemon został pomyślnie utworzony!'}
				</Notification>
			)
		}

		if (error) {
			return (
				<Notification variant='error' autoHideDuration={1000}>
					{pokemon
						? `Wystąpił błąd podczas edytowania Pokemona ${pokemon.name}`
						: 'Wystąpił błąd podczas tworzenia Pokemona'}
				</Notification>
			)
		}
		return null
	}

	const onSubmit = async data => {
		await createPokemon({ ...data, id: pokemon?.id ?? selectedImage?.id })
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormWrapper>
				{!pokemon && <InputForm label='Nazwa' {...register('name')} error={errors.name} />}
				<InputForm label='Wzrost' type='number' {...register('height')} error={errors.height} />
				<InputForm label='Waga' type='number' {...register('weight')} error={errors.weight} />
				<InputForm
					label='Doświadczenie bazowe'
					type='number'
					{...register('base_experience')}
					error={errors.base_experience}
				/>
				{!pokemon && <ImageCarusele onChange={setSelectedImage} />}
			</FormWrapper>

			{!pokemon && (
				<ButtonSubmit type='submit' disabled={!selectedImage}>
					Stwórz
				</ButtonSubmit>
			)}
			{pokemon && <ButtonSubmit type='submit'>Zmień atrybuty</ButtonSubmit>}
			{notificationMessage()}
		</Form>
	)
}
