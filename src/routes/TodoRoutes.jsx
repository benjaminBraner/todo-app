import { Navigate, Route, Routes } from 'react-router'
import { TodosPage } from '../todos/pages/TodosPage/TodosPage'
import { CategoryPage } from '../todos/pages/CategoryPage/CategoryPage'
import { Sidebar } from '../todos/ui/Sidebar'
import { AddTodoPage } from '../todos/pages/AddTodoPage/AddTodoPage'

export const TodoRoutes = () => {

  return (
	<>
		<Sidebar />
		<Routes>
			<Route path="/todos" element={ <TodosPage /> } />	
			<Route path="/add-todo" element={ <AddTodoPage /> } />	
			<Route path="/category" element={ <CategoryPage /> } />	
			
			<Route path="/*" element={ <Navigate to="/todos"  /> } />	
		</Routes>
	</>
  )
}
