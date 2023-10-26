import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CompaniesLogin.css'
import logoImage from '../../assets/images/logo.jpeg';

const CompaniesLogin = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('white-background');

        return () => {
            document.body.classList.remove('white-background');
        };
    }, []);

    const login = async () => {
        try {
          // http://20.226.8.137:8080/empresas/login || /empresas/login
          const response = await axios.post(`/empresas/login`, {
            email: email,
            senha: senha,
          });

          console.log('Login realizado com sucesso!');

          const token = response.data.token; // Supondo que o token está na resposta do servidor
          localStorage.setItem('token', token);

          const companyId = response.data.idEmpresa;
            if (companyId) {
                navigate(`/companies-page/${companyId}`);
            } else {
                console.error('ID da empresa não encontrado na resposta.');
                navigate('/companies-page'); // Redireciona para uma página padrão (opcional)
            }
        
        } catch (error) {
          // Handle login error.
          console.error('Error logging in:', error);
          console.log('ERRO DE LOGIN');
        }
      };

    return (
      <>
      <div className='container'>
          <img src={logoImage} alt="Logo" className="logo" />
          <h1 className="CompaniesTitle">Cart Genius Companies</h1>
          <label className="CompaniesLabel">E-mail</label>
          <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <label className="CompaniesLabel">Senha</label>
          <input
          className="input"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          />
          <button className="CompaniesButton" onClick={login}>
          <span className='CompaniesButtonText'>Entrar</span>
          </button>
          <p className="CompaniesForgotPassword">Esqueceu sua senha?</p>
          <p className="CompaniesCreateAccountLink">
          Não tem uma conta? <Link className='CompaniesHereLink' to="/companies-create-account">Crie uma aqui</Link>.
          </p>
      </div>
      </>
    );
};

export default CompaniesLogin;