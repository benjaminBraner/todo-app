import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { todosSlice } from './todos/todosSlice'
import { categoriesSlice } from './categories/categoriesSlice'

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		todos: todosSlice.reducer,
		categories: categoriesSlice.reducer
	}
})
