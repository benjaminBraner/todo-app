import { createSlice } from '@reduxjs/toolkit'

export const categoriesSlice = createSlice({
	name: 'categories',
	initialState: {
		isLoading: false,
		isSaving: false,
		isDeleting: false,
		categories: [], // {id: "ABC123", name: "Personal", color: "#ff0000"}, {...}
		errorMessage: null
	},
	reducers: {
		addCategory(state, action) {
			state.categories.push(action.payload)
			state.isLoading = false
			state.isSaving = false
		},
		deleteCategory(state, action) {
			state.categories = state.categories.filter((category) => category.id !== action.payload)
			state.isLoading = false
			state.isDeleting = false
		},
		setCategories(state, action) {
			state.categories = action.payload
			state.isLoading = false
		},
		setLoading(state, action) {
			state.isLoading = true
		},
		setSaving(state, action) {
			state.isSaving = true
			state.isLoading = true
		},
		setDeleting(state, action) {
			state.isDeleting = true
			state.isLoading = true
		},
		setCategoryError(state, action) {
			state.errorMessage = action.payload
		},
		clearCategories(state) {
			state.categories = []
		}
	}
})

export const { 
	addCategory,
	deleteCategory,
	setCategories,
	setLoading,
	setDeleting,
	setSaving,
	setCategoryError,
	clearCategories
} = categoriesSlice.actions
