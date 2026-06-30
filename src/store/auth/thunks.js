import { addDoc, collection, getDocs } from 'firebase/firestore/lite'
import { firestoreDB } from '../../firebase/config'
import { checkingAuthentication, login, logout, setAuthError } from './authSlice'
import { clearTodos, setTodos } from '../todos/todosSlice'
import { getUserMatched } from '../../helpers/getUserMatched'
import { getCategoriesByUserId } from '../../helpers/getCategoriesByUserId'
import { clearCategories, setCategories } from '../categories/categoriesSlice'
import { getTodosByUserId } from '../../helpers/getTodosByUserId'

export const startRegister = (name, email, password) => {
	return async (dispatch) => {
		dispatch(checkingAuthentication())

		const collectionRef = collection(firestoreDB, 'users')
		const docs = await getDocs(collectionRef)
		const result = docs._docs.find((doc) => doc.data().email === email)

		if (!result?.data()) {
			const docRef = await addDoc(collectionRef, { name, email, password })
			const user = { id: docRef.id, name, email, password }
			
			const defaultCategories = [
				{ name: "Personal", color: "#3b82f6" },
				{ name: "Trabajo", color: "#ef4444" },
				{ name: "Hogar", color: "#10b981" },
				{ name: "Estudio", color: "#f59e0b" },
				{ name: "Salud", color: "#8b5cf6" }
			]

			const categoriesRef = collection(firestoreDB, `users/${user.id}/categories`)
			
			const categoriesWithIds = []
			for (const cat of defaultCategories) {
				const newCatRef = await addDoc(categoriesRef, cat)
				categoriesWithIds.push({ id: newCatRef.id, ...cat })
			}

			dispatch(login(user))
			localStorage.setItem('auth', JSON.stringify(user))
			
			dispatch(setCategories(categoriesWithIds))
			
		} else {
			dispatch(setAuthError('This email is already registered'))
		}
	}
}

export const startLogin = (email, password) => {
	return async (dispatch) => {
		dispatch(checkingAuthentication())

		const collectionRef = collection(firestoreDB, 'users')
		const docs = await getDocs(collectionRef)

		const result = getUserMatched(docs, email, password)

		if (result?.data()) {
			const user = { id: result.id, ...result.data() }

			dispatch(login(user))
			localStorage.setItem('auth', JSON.stringify(user))

			const categories = await getCategoriesByUserId(user.id)
			dispatch(setCategories(categories))

			const todos = await getTodosByUserId(user.id)
			dispatch(setTodos(todos))
		} else {
			dispatch(setAuthError('Invalid email or password'))
		}
	}
}

export const startLogout = () => {
	return async (dispatch) => {
		localStorage.removeItem('auth') // Mover localStorage aquí
		dispatch(clearTodos())
		dispatch(clearCategories())
		dispatch(logout())
	}
}

export const checkAuth = () => {
	return async (dispatch) => {
		const auth = localStorage.getItem('auth')
		if (auth) {
			const user = JSON.parse(auth)
			dispatch(login(user))

			// Cargar datos del usuario
			const categories = await getCategoriesByUserId(user.id)
			dispatch(setCategories(categories))
			const todos = await getTodosByUserId(user.id)
			dispatch(setTodos(todos))
		}
	}
}
