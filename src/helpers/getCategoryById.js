import { useSelector } from "react-redux";

export const getCategoryById = (id) => {
	
	const {categories} = useSelector((state) => state.categories)
	return categories.find((category) => category.id === id);
};