// Importe as bibliotecas necessárias
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './GlobalStyles.css'
import Login from './pages/Login/Login';
import CreateAccount from './pages/CreateAccount/CreateAccount';

// Importe seus componentes de página
// import HomePage from './pages/HomePage';
// import SobrePage from './pages/SobrePage';
// import CadastroPage from './pages/CadastroPage';
// import LoginPage from './pages/LoginPage';

// Importe o HeaderMenu
import Menu from './components/Menu/Menu';

function App() {
  return (
    <Router>
      {/* Renderize o Menu fora do Switch para que ele apareça em todas as páginas */}
      <Menu />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
