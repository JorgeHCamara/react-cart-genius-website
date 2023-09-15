import { Link } from 'react-router-dom';
import '../Login/Login.css'
import logoImage from '../../assets/images/logo.jpeg';

const UserPage = () => {

    return (
    <div className='container'>
        <img src={logoImage} alt="Logo" className="logo" />
        <h1 className="title">Cart Genius</h1>
        <button className="button">
            <Link className='button-text' to="/chat">Fazer pedido</Link>
        </button>
    </div>
    );
};

export default UserPage;