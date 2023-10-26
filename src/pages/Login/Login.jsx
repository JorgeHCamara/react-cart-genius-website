import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'
import logoImage from '../../assets/images/logo.jpeg';
import Menu from '../../components/Menu/Menu';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const login = async () => {
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

          const token = response.data.token; // Supondo que o token está na resposta do servidor
          localStorage.setItem('token', token);

          const userId = response.data.id;
            if (userId) {
              localStorage.setItem('userId', userId)
              navigate(`/user-page/${userId}`);
            } else {
              console.error('ID do Usuário não encontrado');
              navigate('/user-page'); // Redireciona para uma página padrão (opcional)
            }
    
        } catch (error) {
          // Handle login error.
          console.error('Error logging in:', error);
          console.log('ERRO DE LOGIN');
        }
      };

    return (
      <>
      <Menu />
      <div className='container'>
          <img src={logoImage} alt="Logo" className="logo" />
          <h1 className="title">Cart Genius</h1>
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
          <p className="forgot-password">Esqueceu sua senha?</p>
          <p className="create-account">
          Não tem uma conta? <Link className='hereLink' to="/create-account">Crie uma aqui</Link>.
          </p>
      </div>
      </>
    );
};

export default Login;