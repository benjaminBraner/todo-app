import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startAddCategory } from '../../../store/categories/thunks'
import { CategoryItem } from './CategoryItem'

export const CategoryPage = () => {
	const [newCategory, setNewCategory] = useState('')
	const [newColor, setNewColor] = useState('#000000')
	const dispatch = useDispatch()
	const { categories, isSaving } = useSelector((state) => state.categories)

	const handleSubmit = (e) => {
		e.preventDefault()
		if (newCategory.trim()) {
			dispatch(startAddCategory(newCategory, newColor))
			setNewCategory('')
			setNewColor('#000000')
		}
	}
	

	return (
		<div className="category-page animate__animated animate__fadeIn">
			
			<div className="form-container">
				<form onSubmit={handleSubmit} className="category-form">
					<div className="form-group">
						<input 
							type="text" 
							placeholder="Category Name" 
							value={newCategory} 
							onChange={(e) => setNewCategory(e.target.value)} 
							className="category-input" 
						/>
					</div>
					<div className="form-group color-group">
						<input 
							type="color" 
							value={newColor} 
							onChange={(e) => setNewColor(e.target.value)} 
							className="color-input" 
						/>
						<span className="color-preview" style={{ backgroundColor: newColor }}></span>
					</div>
					<button type="submit" className="submit-button" disabled={isSaving}>
						Add Category
					</button>
				</form>
			</div>

			<div className="categories-list">
				{categories.map((category) => (
					<CategoryItem key={category.id} {...category}/>
				))}
			</div>
		</div>
	)
}
