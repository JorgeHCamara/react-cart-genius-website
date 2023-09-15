import { Link } from 'react-router-dom';
// import { MenuStyle, MenuItems, MenuItem, MenuLink } from './MenuStyles';
import './MenuStyles.css'

const Menu = () => {
  return (
    <nav className='menuStyle'>
      <ul className='menuItems'> 
        <li className='menuItem'>
          <Link className='menuLink' to="/sobre">Sobre</Link>
        </li>
        <li className='menuItem'>
          <Link className='menuLink' to="/cadastro">Cadastro</Link>
        </li>
        <li className='menuItem'>
          <Link className='menuLink' to="/login">Login</Link>
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
