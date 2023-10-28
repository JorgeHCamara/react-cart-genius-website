import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'
import Menu from '../../components/Menu/Menu';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const login = async () => {

        setLoading(true);

        try {
          // /clientes/login || http://20.226.8.137:8080/clientes/login
          const response = await axios.post(`/clientes/login`, {
            email: email,
            senha: senha,
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });

          console.log('Login realizado com sucesso!');

          const token = response.data.token;
          localStorage.setItem('token', token);

          const userId = response.data.id;
            if (userId) {
              localStorage.setItem('userId', userId)
              navigate(`/user-page/${userId}`);
            } else {
              console.error('ID do Usuário não encontrado');
              navigate('/user-page');
            }

            const userName = response.data.nome; 
            if (userName) {
                localStorage.setItem('userName', userName);
            }
    
        } catch (error) {
          window.alert('Deu algum problema ao entrar na sua conta.');
          console.error('Error logging in:', error);
          console.log('ERRO DE LOGIN');
        } finally {
          setLoading(false);
        }
      };

      return (
        <>
        <Menu />
        <div className="container-login">
            <div className='login-left'>
                <h2>Entrar</h2>
                <div className="login-form">
                    <input
                    className="input-login"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                    />
                    <input
                    className="input-login"
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder='Senha'
                    />
                    <p className="forgot-password">Esqueceu a senha?</p>
                    <button className="button-login" onClick={login}>
                        Entrar
                    </button>
                    {loading && <LoadingSpinner />}
                </div>
            </div>
            
            {/* Parte do Hello, Friend! */}
            <div className='login-right'>
                <h2>Não tem conta?</h2>
                <p>Clique no botão abaixo e comece sua jornada no Cart Genius</p>
                <Link className='signup-btn' to="/create-account">Criar nova conta</Link>
            </div>
        </div>
        </>
    );
};

export default Login;