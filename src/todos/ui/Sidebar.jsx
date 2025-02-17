import { useState } from 'react'
import { useNavigate } from 'react-router'
import { startLogout } from '../../store/auth/thunks'
import { useDispatch, useSelector } from 'react-redux'

export const Sidebar = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const {name} = useSelector(state => state.auth)
	const dispatch = useDispatch()

	sidebarOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = '')

	const navigate = useNavigate()

	const navigateTo = (path) => {
		navigate(path)
		setSidebarOpen(false)
	}
	
	const handleLogout = () => {
		dispatch(startLogout())
		navigate('/');
	}

	return (
		<>
			{/*  Overlay */}
			<div id="overlay" className={`overlay ${sidebarOpen ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}></div>

			{/*  Menu Trigger Button */}
			<button id="menuTrigger" className="menu-trigger" onClick={() => setSidebarOpen(true)}>
				<img src="/icons/menu.svg" />
			</button>

			<div id="sidebar" className={`sidebar ${sidebarOpen ? 'expanded' : 'collapsed'}`}>
				{/*  Header */}
				<div className="sidebar-header">
					<span className="app-title nav-text">Todo App</span>
					<button id="toggleSidebar" className="nav-item" onClick={() => setSidebarOpen(!sidebarOpen)}>
						<img src="/icons/chevron-left.svg" />
					</button>
				</div>

				{/*  User Info */}
				<div className="user-info">
					<div className="flex items-center gap-3">
						<img src="/icons/user.svg" />
						<span className="nav-text">{name}</span>
					</div>
				</div>

				{/*  Navigation */}
				<nav className="nav-menu">
					<div className="nav-item" onClick={() => navigateTo('/todos')}>
						<img src="/icons/todo.svg" />
						<span className="nav-text">To-dos</span>
					</div>
					<div className="nav-item" onClick={() => navigateTo('/add-todo')}>
						<img src="/icons/add-todo.svg" />
						<span className="nav-text">Add To-do</span>
					</div>
					<div className="nav-item" onClick={() => navigateTo('/category')}>
						<img src="/icons/category.svg" />
						<span className="nav-text">Category</span>
					</div>
					<div className="nav-item" onClick={handleLogout}>
						<img src="/icons/logout.svg" />
						<span className="nav-text">Logout</span>
					</div>
				</nav>
			</div>
		</>
	)
}
