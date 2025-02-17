import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startLogin } from '../../store/auth/thunks'
import { NavLink } from 'react-router'

const formData = {
	email: '',
	password: ''
}

export const LoginPage = () => {

	const dispatch = useDispatch()
	const { email, password, onInputChange } = useForm(formData)
	const {status} = useSelector(state => state.auth)
	
	const handleSubmit = async (e) => {
		e.preventDefault()		
		dispatch( startLogin(email, password) )
		
	}

	return (
		<div className="auth-container">
			<div className="auth-box">
				<h2 className="auth-title">Login</h2>
				<form onSubmit={handleSubmit} className="auth-form">
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input 
							type="email" 
							id="email" 
							name="email" 
							value={email} 
							onChange={onInputChange} 
							placeholder="Enter your email" 
							required 
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input 
							type="password" 
							id="password" 
							name="password" 
							value={password} 
							onChange={onInputChange} 
							placeholder="Enter your password" 
							required 
						/>
					</div>
					<button type="submit" className="auth-button" disabled={status === 'checking'}>
						Login
					</button>
				</form>
				<p className="auth-link">
					Don't have an account? <NavLink to="/register">Register here</NavLink>
				</p>
			</div>
		</div>
	)
}
