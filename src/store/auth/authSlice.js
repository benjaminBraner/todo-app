import { createSlice } from '@reduxjs/toolkit'



export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		status: 'not-autheticaded', // authenticated, not-autheticaded, checking
		id: null,
		name: '',
		email: '',
		errorMessage: null,
		isLoading: false
	},
	reducers: {
		login(state, action) {
			state.status = 'authenticated'
			state.id = action.payload.id;
			state.name = action.payload.name
			state.email = action.payload.email
			state.errorMessage = null
			state.isLoading = false
		},
		logout(state) {
			state.status = 'not-autheticaded'
			state.id = null
			state.name = ''
			state.email = ''
			state.errorMessage = null
		},
		checkingAuthentication(state) {
			state.status = 'checking'
			state.isLoading = true
		},
		setAuthError(state, action) {
			state.errorMessage = action.payload
		},
		setLoading(state, action) {
			state.isLoading = true
		}
	}
})

export const { 
	login,
	logout,
	checkingAuthentication,
	setAuthError,
	setLoading 
} = authSlice.actions
