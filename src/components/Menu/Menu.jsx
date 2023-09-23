import { useState } from 'react';
import { Link } from 'react-router-dom';
import './MenuStyles.css'
import { useAuth } from '../AuthContext/AuthContext';

const Menu = () => {
  const { isLoggedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
};

  return (
    <nav className='menuStyle'>
      <button onClick={toggleMenu} className="hamburger-button">
                ☰
      </button>
      <ul className={`menuItems ${isMenuOpen ? 'open' : ''}`}> 
        <li className='menuItem'>
          <Link className='menuLink' to="/about">Sobre</Link>
        </li>
        {isLoggedIn ? (
          <li className='menuItem'>
            <Link className='menuLink' to="/user-page">Conta</Link>
          </li>
        ) : (
          <li className='menuItem'>
            <Link className='menuLink' to="/login">Login</Link>
          </li>
        )}
        <li className='menuItem'>
          <Link className='menuLink' to="/create-account">Cadastro</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
