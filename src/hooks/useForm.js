import { useEffect, useState } from 'react'

export const useForm = (initialForm = {}) => {
	const [formState, setFormState] = useState(initialForm)
	
	//Si el initialForm cambia se vuelven a mandar los nuevos valores
	useEffect(() => {
		setFormState(initialForm)
	}, [initialForm])

	const onInputChange = ({ target }) => {
		const { name, value } = target
		setFormState({
			...formState,
			[name]: value
		})
	}

	const onResetForm = () => {
		setFormState(initialForm)
	}

	return {
		...formState,
		formState,
		onInputChange,
		onResetForm
	}
}
