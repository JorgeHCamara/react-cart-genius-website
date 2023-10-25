import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import '../Login/Login.css'
import logoImage from '../../assets/images/logo.jpeg';
import { useAuth } from '../../components/AuthContext/AuthContext';
import Menu from '../../components/Menu/Menu';

const UserPage = () => {

    const { setIsLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    useEffect(() => {
        const userToken = localStorage.getItem('token');
        if (userToken) {
            setIsLoggedIn(true);
            
        }
    }, [setIsLoggedIn]);

    return (
        <>
            <Menu />
            <div className='container'>
                <img src={logoImage} alt="Logo" className="logo" />
                <h1 className="title">Cart Genius</h1>
                <button className="button">
                    <Link className='button-text' to="/chat">Fazer pedido</Link>
                </button>
                <button className="button" onClick={handleLogout}>
                    <span className='button-text'>Sair</span>
                </button>
            </div>
        </>
    );
};

export default UserPage;