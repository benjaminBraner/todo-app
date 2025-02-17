import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../../hooks/useForm'
import { CustomSelect } from './CustomSelect'
import { startAddTodo } from '../../../store/todos/thunks'

const formData = {
	title: '',
	category: '',
	dueTo: ''
}

export const AddTodoPage = () => {
	const dispatch = useDispatch()
	const currentDate = new Date().toISOString().split('T')[0]
	const { categories } = useSelector((state) => state.categories)
	const { isSaving } = useSelector((state) => state.todos)
	const {title, category, dueTo, onInputChange} = useForm(formData)
	
	const handleSubmit = (e) => {
		e.preventDefault()
		console.log({title, category, dueTo})
		dispatch(startAddTodo(title, category, dueTo))
	}

	

	return (
		<div className="add-todo-page animate__animated animate__fadeIn">
			<form onSubmit={handleSubmit} className="todo-form">
				<div className="form-header">
					<h1>New Todo</h1>
					<div className="header-line"></div>
				</div>

				<div className="form-group">
					<input 
						type="text" 
						name="title" 
						value={title} 
						onChange={onInputChange} 
						placeholder="What do you want to do?" 
						className="title-input" 
						autoFocus 
					/>
				</div>

				<div className="form-row">
					<div className="form-group category-group">
						<label>Category</label>
						<CustomSelect
							name="category"
							value={category}
							onChange={onInputChange}
							categories={categories}
  						/>
					</div>

					<div className="form-group">
						<label>Due to</label>
						<input 
							type="date" 
							name="dueTo" 
							value={dueTo} 
							onChange={onInputChange} 
							className="date-input" 
							min={currentDate} 
						/>
					</div>
				</div>

				<button type="submit" className="submit-button" disabled={isSaving}>
					<span>Create Todo</span>
				</button>
			</form>
		</div>
	)
}
