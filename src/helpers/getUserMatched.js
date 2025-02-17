export const getUserMatched = (docs, email, password) => {
	return docs._docs.find((doc) => {
		const data = doc.data();
		return data.email === email && data.password === password;
	});
};