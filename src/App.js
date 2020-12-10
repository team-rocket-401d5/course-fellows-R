import Register from './components/Register';
import RegisterProvider from './context/auth';
import Auth from '../src/context/outhprevent';

function App() {
	return (
		<RegisterProvider>
			<Auth />
			<Register />
		</RegisterProvider>
	);
}

export default App;
