import { Route, Routes } from 'react-router'
import { PublicRoutes } from '../routes/PublicRoutes'
import { TodoRoutes } from '../routes/TodoRoutes'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from '../store/auth/thunks'

export const AppRouter = () => {
	const dispatch = useDispatch()
	const { status } = useSelector((state) => state.auth)

	useEffect(() => {
		dispatch(checkAuth())
	}, [])

	return (
		<Routes>
			{status === 'authenticated' ? <Route path="/*" element={<TodoRoutes />} /> : <Route path="/*" element={<PublicRoutes />} />}
			<Route path="/*" element={<PublicRoutes />} />
		</Routes>
	)
}
