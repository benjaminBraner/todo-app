import { createSlice } from '@reduxjs/toolkit'

export const todosSlice = createSlice({
	name: 'todos',
	initialState: {
		todos: [], // {id: "ABC123", title: "", category: "", status: "", createdAt: 2025-02-13, dueTo: 2025-02-22}, {...}
		isSaving: false,
		isDeleting: false,
		isLoading: false,
		errorMesage: null,
	},
	reducers: {
		setTodos(state, action) {
			state.todos = action.payload
			state.isLoading = false
		},
		addTodo(state, action) {
			state.isSaving = false
			state.isLoading = false
			state.todos.push(action.payload)
		},
		deleteTodo(state, action) {
			state.isDeleting = false
			state.isLoading = false
			state.todos = state.todos.filter((todo) => todo.id !== action.payload)
		},
		toggleTodoStatus(state, action) {
			state.isSaving = false
			state.todos = state.todos.map((todo) => {
				if (todo.id === action.payload) {
					return {
						...todo,
						status: todo.status === 'pending' ? 'completed' : todo.status === 'completed' ? 'pending' : todo.status
					}
				}
				return todo
			})
		},
		setLoading(state, action) {
			state.isLoading = true
		},
		setTodoError(state, action) {
			state.error = action.payload
		},
		setSaving(state, action) {
			state.isSaving = true
			state.isLoading = true
		},
		setDeleting(state, action) {
			state.isDeleting = true
			state.isLoading = true
		},
		clearTodos(state) {
			state.todos = []
		}
	}
})

export const { 
	setTodos,
	addTodo,
	deleteTodo,
	toggleTodoStatus,
	setLoading,
	setTodoError,
	setSaving,
	setDeleting,
	clearTodos 
} = todosSlice.actions
