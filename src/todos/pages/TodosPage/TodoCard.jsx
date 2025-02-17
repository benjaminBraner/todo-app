import { useState } from 'react'
import { getCategoryById } from '../../../helpers/getCategoryById'
import { getDarkColor } from '../../../helpers/getDarkColor';
import { getLightColor } from '../../../helpers/getLightColor';
import { startDeleteTodo, startToggleTodoStatus } from '../../../store/todos/thunks';
import { useDispatch } from 'react-redux';

export const TodoCard = ({ id, title, category, status, createdAt, dueTo }) => {
	
	const [strikethrough, setStrikethrough] = useState(status === 'completed');
	const categoryObj = getCategoryById(category) || {color: '#000000', name: 'No category'};
	const dispatch = useDispatch()
	
	const onDeleteTodo = () => {
		dispatch(startDeleteTodo(id))
	}
	
	const toggleStatus = () => {
		setStrikethrough(!strikethrough)
		dispatch(startToggleTodoStatus(id))
	}
	return (
		<div className="todo-card">
			<div className="card-header">
				<div>
					<span className="date-info">Created: {createdAt}</span>
					<div className="date-with-icon">
						<img src="/icons/clock.svg" className="in-time" />
						<span className="date-info">Due: {dueTo}</span>
					</div>
				</div>
				<span className={`todo-status status-${status}`}>{status}</span>
			</div>

			<h3 className="todo-title" onClick={toggleStatus} style={{ textDecoration: strikethrough ? 'line-through' : 'none' }}>{title}</h3>

			<div className="flex items-center justify-between">
				<span 
					className="todo-category" 
					style={{ 
						color: getDarkColor(categoryObj.color),
						backgroundColor: getLightColor(categoryObj.color)
					}}
				>
					{categoryObj.name}
				</span>
				<button 
					onClick={onDeleteTodo}
					className="delete-button"
					aria-label="Delete todo"
				>
					<img src="/icons/trash.svg" alt="Delete" className="delete-icon" />
				</button>
			</div>
		</div>
	)
}