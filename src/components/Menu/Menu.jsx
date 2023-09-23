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
          <Link className='menuLink' to="/about" onClick={toggleMenu}>Sobre</Link>
        </li>
        {isLoggedIn ? (
          <li className='menuItem'>
            <Link className='menuLink' to="/user-page" onClick={toggleMenu}>Conta</Link>
          </li>
        ) : (
          <li className='menuItem'>
            <Link className='menuLink' to="/login" onClick={toggleMenu}>Login</Link>
          </li>
        )}
        <li className='menuItem'>
          <Link className='menuLink' to="/create-account" onClick={toggleMenu}>Cadastro</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
