import { AppRouter } from './router/AppRouter'
import { Toaster } from 'react-hot-toast'

function TodoApp() {
	return (
		<>
			<Toaster position="top-center" reverseOrder={false} />
			<AppRouter />
		</>
	)
}

export default TodoApp
