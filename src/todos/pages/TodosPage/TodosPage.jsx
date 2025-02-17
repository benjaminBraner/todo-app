import { useState } from 'react'
import { useSelector } from 'react-redux'
import { TodoCard } from './TodoCard'
import { useNavigate } from 'react-router'
import { TodosEmpty } from './TodosEmpty'

export const TodosPage = () => {
	const { todos } = useSelector((state) => state.todos)
	const [inputSearch, setInputSearch] = useState('')

	const navigate = useNavigate()

	return (
		<>
			<div id="mainContent" className="main-content animate__animated animate__fadeIn">
				<header className="header">
					<div className="header-container">
						<h1 className="header-title">To-Dos</h1>
						<div className="search-container">
							<input type="text" placeholder="Search tasks..." className="search-input" onChange={(e) => setInputSearch(e.target.value)} />
							<button className="new-task-btn" onClick={() => navigate('/add-todo')}>
								New Todo
							</button>
						</div>
					</div>
				</header>

				<main className="main-container">
					{
						todos.length > 0 ?
						(
							<div className="todo-grid">
								 {
									todos.map((todo) => (
										todo.title.toLowerCase().includes(inputSearch.toLowerCase()) && <TodoCard key={todo.id} {...todo}/>
									))
								} 
							</div>
						)
						:
						(
							<TodosEmpty />
						)
					}
				</main>
			</div>
		</>
	)
}
