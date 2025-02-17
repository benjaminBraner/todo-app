import { getLightColor } from '../../../helpers/getLightColor'
import { getDarkColor } from '../../../helpers/getDarkColor'
import { useDispatch } from 'react-redux'
import { startDeleteCategory } from '../../../store/categories/thunks'

export const CategoryItem = ({ id, name, color }) => {
	const dispatch = useDispatch()
	const handleDelete = (id) => {
		dispatch(startDeleteCategory(id))
	}
	
	return (
		<div
			key={id}
			className="category-item"
			style={{
				'--category-color': color,
				backgroundColor: getLightColor(color)
			}}
		>
			<span className="category-name" style={{ color: getDarkColor(color) }}>
				{name}
			</span>
			<div className="category-actions">
				<div className="color-circle" style={{ backgroundColor: color }} />
				<button className="delete-button-category" onClick={() => handleDelete(id)} title="Eliminar categoría">
					🗑️
				</button>
			</div>
		</div>
	)
}
