import logo from './logo.svg';
import './App.css';
import Register from './components/Register';
import RegisterProvider from './context/auth';

function App() {
  return (
    <RegisterProvider>
      <Register></Register>
    </RegisterProvider>
  );
}

export default App;
