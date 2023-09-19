import { Link } from 'react-router-dom';
// import { MenuStyle, MenuItems, MenuItem, MenuLink } from './MenuStyles';
import './MenuStyles.css'
import { useAuth } from '../AuthContext/AuthContext';

const Menu = () => {
  const { isLoggedIn } = useAuth();

  return (
    <nav className='menuStyle'>
      <ul className='menuItems'> 
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

// const styles = {
//   Menu: {
//     color: 'white',
//     padding: '30px 0',
//   },
//   menuItems: {
//     listStyleType: 'none',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   menuItem: {
//     margin: '0 60px',
//   },
//   link: {
//     textDecoration: 'none',
//     color: 'white',
//     fontSize: '24px',
//     &:hover {
//         color: 'fff'
//     }
//   },
// };

export default Menu;
