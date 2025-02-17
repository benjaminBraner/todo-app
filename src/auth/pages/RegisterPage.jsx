import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startRegister } from '../../store/auth/thunks'
import { NavLink } from 'react-router'

const formData = {
	name: '',
	email: '',
	password: ''
}

export const RegisterPage = () => {
	
	const {name, email, password, onInputChange} = useForm(formData)
	const dispatch = useDispatch()
	
	const {isLoading} = useSelector(state => state.auth)

	const handleSubmit = async (e) => {
		e.preventDefault()
		dispatch( startRegister( name, email, password ) )
	}

	return (
		<div className="auth-container">
			<div className="auth-box">
				<h2 className="auth-title">Register</h2>
				<form onSubmit={handleSubmit} className="auth-form">
					<div className="form-group">
						<label htmlFor="name">Full Name</label>
						<input 
							type="text" 
							id="name" 
							name="name" 
							value={name} 
							onChange={onInputChange} 
							placeholder="Enter your full name" 
							required 
							/>
					</div>
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

					<button type="submit" className="auth-button" disabled={isLoading}>
						Register
					</button>
				</form>
				<p className="auth-link">
					Already have an account? <NavLink to="/login">Login here</NavLink>
				</p>
			</div>
		</div>
	)
}
