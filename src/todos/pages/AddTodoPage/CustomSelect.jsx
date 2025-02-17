import { useState, useRef, useEffect } from 'react'
import { getLightColor } from '../../../helpers/getLightColor'
import { getDarkColor } from '../../../helpers/getDarkColor'

export const CustomSelect = ({ name, value, onChange, categories }) => {
	const [isOpen, setIsOpen] = useState(false)
	const selectRef = useRef(null)

	const handleClickOutside = (event) => {
		if (selectRef.current && !selectRef.current.contains(event.target)) {
			setIsOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const selectedCategory = categories.find((cat) => cat.id === value)

	const handleSelect = (categoryId) => {
		onChange({
			target: {
				name,
				value: categoryId
			}
		})
		setIsOpen(false)
	}

	return (
		<div ref={selectRef} className="custom-select-container">
			<div
				className="custom-select-trigger"
				onClick={() => setIsOpen(!isOpen)}
				style={{
					backgroundColor: selectedCategory ? getLightColor(selectedCategory.color) : 'white',
					color: selectedCategory ? getDarkColor(selectedCategory.color) : '#666'
				}}
			>
				{selectedCategory ? (
					<>
						<span className="category-dot" style={{ backgroundColor: selectedCategory.color }} />
						{selectedCategory.name}
					</>
				) : (
					'Select a category'
				)}
				<span className="select-arrow">▼</span>
			</div>

			{isOpen && (
				<div className="custom-select-options">
					{categories.map((category) => (
						<div
							key={category.id}
							className="custom-select-option"
							onClick={() => handleSelect(category.id)}
							style={{
								backgroundColor: value === category.id ? getLightColor(category.color) : 'white',
								color: value === category.id ? getDarkColor(category.color) : '#333'
							}}
						>
							<span className="category-dot" style={{ backgroundColor: category.color }} />
							{category.name}
						</div>
					))}
				</div>
			)}
		</div>
	)
}
