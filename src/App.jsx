import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './GlobalStyles.css'
import Login from './pages/Login/Login';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import UserPage from './pages/UserPage/UserPage';
import ChatPage from './pages/ChatPage/ChatPage';
import { AuthProvider } from './components/AuthContext/AuthContext';
import Home from './pages/Home/Home'
import CompaniesLogin from './pages/CompaniesLogin/CompaniesLogin'
import CompaniesCreateAccount from './pages/CompaniesCreateAccount/CompaniesCreateAccount'
import CompaniesPage from './pages/CompaniesPage/CompaniesPage'
import CompaniesAddProduct from './pages/CompaniesAddProduct/CompaniesAddProduct';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/user-page" element={<UserPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/companies" element={<CompaniesLogin />} />
          <Route path="/companies-create-account" element={<CompaniesCreateAccount />} />
          <Route path="/companies-page/:companyId" element={<CompaniesPage />} />
          <Route path="/companies-page/:companyId/add-product" element={<CompaniesAddProduct />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
