import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FetchDataContext } from '../../context'
import { updateCustomPokemonField, Notification } from '../../services'
import { ImageCarusele, Button, InputForm } from '../shared'
import styled from 'styled-components'

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

export const NewPokemonForm = () => {
	const { fetchData } = useContext(FetchDataContext)
	const [selectedImage, setSelectedImage] = useState(null)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
	})

	const navigate = useNavigate()

	const onSubmit = async data => {
		const newPokemon = { ...data, id: selectedImage.id, image: selectedImage.image }

		try {
			await updateCustomPokemonField(newPokemon.id, newPokemon)
			fetchData()
			navigate('/')
		} catch (error) {
			console.log('Error creating pokemon:', error)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormWrapper>
				<InputForm label='Nazwa' {...register('name')} error={errors.name} />
				<InputForm label='Wzrost' type='number' {...register('height')} error={errors.height} />
				<InputForm label='Waga' type='number' {...register('weight')} error={errors.weight} />
				<InputForm
					label='Doświadczenie bazowe'
					type='number'
					{...register('base_experience')}
					error={errors.base_experience}
				/>
				<ImageCarusele onChange={setSelectedImage} />
			</FormWrapper>

			<Button type='submit' disabled={!selectedImage}>
				Stwórz
			</Button>
		</form>
	)
}
