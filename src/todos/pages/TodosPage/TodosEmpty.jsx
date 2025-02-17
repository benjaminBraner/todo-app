export const TodosEmpty = () => {
	return (
		<div className="todos-empty">
			<div className="todos-empty-content">
				<img src="/icons/check.svg" alt="No todos" className="todos-empty-icon" />
				<h2 className="todos-empty-title">No tasks yet</h2>
				<p className="todos-empty-text">Start creating some todos to track your tasks</p>
			</div>
		</div>
	)
}
