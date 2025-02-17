import { Route, Routes } from 'react-router'
import { LoginPage } from '../auth/pages/LoginPage'
import { RegisterPage } from '../auth/pages/RegisterPage'
import { WelcomePage } from '../welcome/WelcomePage'

export const PublicRoutes = () => {
	return (
		<Routes>
			<Route path="/*" element={<WelcomePage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
		</Routes>
	)
}
