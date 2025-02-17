import { addDoc, collection, deleteDoc, doc } from "firebase/firestore/lite";
import { addCategory, deleteCategory, setCategoryError, setDeleting, setSaving } from "./categoriesSlice";
import { firestoreDB } from "../../firebase/config";
import toast from "react-hot-toast";

export const startAddCategory = (name, color) => {
	return async (dispatch, getState) => {
		dispatch(setSaving())
		const newCategory = {name, color}
		const { id:userId } = getState().auth
		
		try {
			
			const categoriesRef = collection(firestoreDB, `users/${userId}/categories`);
			const docRef = await addDoc(categoriesRef, newCategory)
			dispatch(addCategory({id: docRef.id, ...newCategory}))
			toast.success('Category Added!',{
				style: {
				  borderRadius: '50px',
				  background: '#333',
				  color: '#fff',
				},
			  })
			
		} catch (error) {
			setCategoryError(error.message)	
			toast.error('Something went wrong',{
				style: {
				  borderRadius: '50px',
				  background: '#333',
				  color: '#fff',
				},
			  })
		}
	}
}


export const startDeleteCategory = (categoryId) => {
	return async (dispatch, getState) => {
		dispatch(setDeleting())
		const {id:userId} = getState().auth
		
		try {
			
			const docRef  = doc(firestoreDB, `users/${userId}/categories/${categoryId}`);
			await deleteDoc(docRef)
			dispatch(deleteCategory(categoryId))
			toast.success('Category Deleted',{
				style: {
				  borderRadius: '50px',
				  background: '#333',
				  color: '#fff',
				},
			  })
			
		} catch (error) {
			setCategoryError(error.message)
		}
	}
}


