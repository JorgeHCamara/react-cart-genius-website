import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MenuStyles.css'
import { useAuth } from '../AuthContext/AuthContext';
import logoImage from '../../assets/images/logo.jpeg'

const Menu = () => {
  const { isLoggedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAboutClick = () => {
    navigate('/#about');
  };

  const handleBenefitsClick = () => {
    navigate('/#benefits');
  };

  return (
    <nav className='menuStyle'>
      <div className="menuLogo">
          <img src={logoImage} alt="Logo" width='80' />
          <h1>Cart Genius</h1>
      </div>
      <button onClick={toggleMenu} className="hamburger-button">
                ☰
      </button>
      <ul className={`menuItems ${isMenuOpen ? 'open' : ''}`}>
        <li className='menuItem'>
          <Link className='menuLink' to="/" onClick={toggleMenu}>Home</Link>
        </li> 
        <li className='menuItem'>
          <a className='menuLink' href='#about' onClick={handleAboutClick}>Sobre</a>
        </li>
        <li className='menuItem'>
          <a className='menuLink' href='#benefits' onClick={handleBenefitsClick}>Benefícios</a>
        </li>
        {isLoggedIn ? (
          <li className='menuItem'>
            <Link className='menuLink' to={`/user-page/${userId}`} onClick={toggleMenu}>Conta</Link>
          </li>
        ) : (
          <li className='menuItem'>
            <Link className='menuLink' to="/login" onClick={toggleMenu}>Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Menu;
