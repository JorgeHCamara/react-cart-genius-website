import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import '../Login/Login.css'
import './UserPage.css'
import noPhotoUser from '../../assets/images/user-sem-foto.jpg';
import { useAuth } from '../../components/AuthContext/AuthContext';
import Menu from '../../components/Menu/Menu';

const UserPage = () => {

    const { setIsLoggedIn } = useAuth();
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

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
                <img src={noPhotoUser} alt="Logo" className="user-photo" />
                <h1 className="title">Olá, {userName}!</h1>
                <button className="button">
                    <Link className='button-text' to={`/user-page/${userId}/chat`}>Fazer pedido</Link>
                </button>
                <button className="button" onClick={handleLogout}>
                    <span className='button-text'>Sair</span>
                </button>
            </div>
        </>
    );
};

export default UserPage;