import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore/lite'
import { addTodo, deleteTodo, setSaving, setTodoError, toggleTodoStatus } from './todosSlice'
import { firestoreDB } from '../../firebase/config'
import toast from 'react-hot-toast'

export const startAddTodo = (title, category, dueTo) => {
	return async (dispatch, getState) => {
		dispatch(setSaving())
		const { id: userId } = getState().auth
		const newTodo = {
			title,
			category,
			status: 'pending',
			createdAt: new Date().toISOString().split('T')[0],
			dueTo
		}
		try {
			const docRef = await addDoc(collection(firestoreDB, `users/${userId}/todos`), newTodo)
			dispatch(addTodo({ id: docRef.id, ...newTodo }))
			toast.success('Todo created successfully!', {
				style: {
					borderRadius: '50px',
					background: '#333',
					color: '#fff'
				}
			})
		} catch (error) {
			setTodoError(error.message)
			toast.error('Something went wrong', {
				style: {
					borderRadius: '50px',
					background: '#333',
					color: '#fff'
				}
			})
		}
	}
}

export const startDeleteTodo = (todoId) => {
	return async (dispatch, getState) => {
		const { id: userId } = getState().auth
		try {
			const docRef = doc(firestoreDB, `users/${userId}/todos/${todoId}`)
			await deleteDoc(docRef)
			dispatch(deleteTodo(todoId))
			toast.success('Todo deleted successfully!', {
				style: {
					borderRadius: '50px',
					background: '#333',
					color: '#fff'
				}
			})
		} catch (error) {
			setTodoError(error.message)
		}
	}
}

export const startToggleTodoStatus = (todoId) => {
	return async (dispatch, getState) => {
		const { id: userId } = getState().auth
		dispatch(toggleTodoStatus(todoId))
		try {
			const docRef = doc(firestoreDB, `users/${userId}/todos/${todoId}`)
			const todo = await getDoc(docRef)
			const {status} = todo.data()
			// console.log(status)
			const newStatus = status === 'pending' ? 'completed' : 'pending'
			await updateDoc(docRef, { status: newStatus })
			
		} catch (error) {
			setTodoError(error.message)
		}
	}
}