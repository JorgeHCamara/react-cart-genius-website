import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './GlobalStyles.css'
import Login from './pages/Login/Login';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import UserPage from './pages/UserPage/UserPage';
import ChatPage from './pages/ChatPage/ChatPage';
import Menu from './components/Menu/Menu';
import { AuthProvider } from './components/AuthContext/AuthContext';
import About from './pages/About/About';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/user-page" element={<UserPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
