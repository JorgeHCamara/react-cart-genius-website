import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'
import logoImage from '../../assets/images/logo.jpeg';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [personType, setPersonType] = useState('');
    const [showInputs, setShowInputs] = useState(false);

    const navigate = useNavigate();

    const choosePersonType = (type) => {
        setPersonType(type);
        setShowInputs(true);
    };

    const login = async () => {
        try {
          // Replace this with your API endpoint for web.
          // eslint-disable-next-line no-unused-vars
          const response = await axios.post(`http://localhost:8080/${personType}/login`, {
            email: email,
            senha: senha,
          });

          console.log('Login realizado com sucesso!');

          navigate('/user-page');
    
          // Handle the response data as needed.
    
        } catch (error) {
          // Handle login error.
          console.error('Error logging in:', error);
          console.log('ERRO DE LOGIN');
        }
      };

    return (
    <div className='container'>
        <img src={logoImage} alt="Logo" className="logo" />
        <h1 className="title">Cart Genius</h1>
        {!showInputs && (
        <>
            <button className="button" onClick={() => choosePersonType('clientes')}>
              <span className="button-text">Cliente</span>
            </button>
            <button className="button" onClick={() => choosePersonType('empresas')}>
              <span className="button-text">Empresa</span>
            </button>
        </>
        )}
        {showInputs && (
        <>
            <label className="label">E-mail</label>
            <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <label className="label">Senha</label>
            <input
            className="input"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            />
            <button className="button" onClick={login}>
            <span className='button-text'>Entrar</span>
            </button>
        </>
        )}
        <p className="forgot-password">Esqueceu sua senha?</p>
        <p className="create-account">
        Não tem uma conta? <Link className='hereLink' to="/create-account">Crie uma aqui.</Link>
        </p>
    </div>
    );
};

export default Login;