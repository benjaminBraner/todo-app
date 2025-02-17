import React from 'react'
import ReactDOM from 'react-dom/client'
import TodoApp from './TodoApp.jsx'
import './index.css'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<TodoApp />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
)
