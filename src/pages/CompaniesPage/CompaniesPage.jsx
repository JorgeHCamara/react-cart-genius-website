import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import '../Login/Login.css'
import logoImage from '../../assets/images/logo.jpeg';
import { useAuth } from '../../components/AuthContext/AuthContext';

const CompaniesPage = () => {
    const { companyId } = useParams();

    useEffect(() => {
        document.body.classList.add('white-background');

        return () => {
            document.body.classList.remove('white-background');
        };
    }, []);

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
    <div className='container'>
        <img src={logoImage} alt="Logo" className="logo" />
        <h1 className="CompaniesTitle">Cart Genius Companies</h1>
        <button className="CompaniesButton">
            <Link className='CompaniesButtonText' to={`/companies-page/${companyId}/add-product`}>Cadastrar produto</Link>
        </button>
        <button className="CompaniesButton">
            <Link className='CompaniesButtonText' to="/chat">Genius Insights</Link>
        </button>
        <button className="CompaniesButton" onClick={handleLogout}>
            <span className='CompaniesButtonText'>Sair</span>
        </button>
    </div>
    );
};

export default CompaniesPage;