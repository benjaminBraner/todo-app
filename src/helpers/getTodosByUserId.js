import { collection, getDocs } from "firebase/firestore/lite";
import { firestoreDB } from "../firebase/config";

export const getTodosByUserId = async (id) => {
	const collectionRef = collection(firestoreDB, `users/${id}/todos`);
	const docs = await getDocs(collectionRef);
	return docs._docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}