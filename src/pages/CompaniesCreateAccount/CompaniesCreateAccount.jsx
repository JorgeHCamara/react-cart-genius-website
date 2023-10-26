/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';
import './CompaniesCreateAccount.css'
import Menu from '../../components/Menu/Menu';

const CompaniesCreateAccount = () => {

    useEffect(() => {
        document.body.classList.add('white-background');

        return () => {
            document.body.classList.remove('white-background');
        };
    }, []);

  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cnpj, setCnpj] = useState('');

  const [emailError, setEmailError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const emailRegex = /\S+@\S+\.\S+/;
    const validEmail = emailRegex.test(email);
    

    if (emailTouched) {
      setEmailError(validEmail ? '' : 'Informe um e-mail válido.');
    }
  }, [email, telefone, emailTouched]);

  const register = async () => {
    // http://20.226.8.137:8080/empresas/ || 
    let url = `/empresas/`;
    let data = {
      nome: nome,
      endereco: endereco,
      telefone: telefone,
      email: email,
      senha: senha,
      cnpj: cnpj
    };

    try {
      const response = await axios.post(url, data);
      setModalIsOpen(true);
    } catch (error) {
      console.log(error.response.data);
      console.log(url);
      console.log(data);
      window.alert('Deu algum problema ao criar a conta.');
    }
  };

  const continueToLoginCompanies = () => {
    setModalIsOpen(false);
    window.location.href = '/companies';
  };

  const allFieldsFilled = () => {
    const isEmailValid = !emailError;
    const commonFields = nome && endereco && telefone && email && senha && isEmailValid;
    return commonFields;
  };

  return (
    <>
      <div className="container">
        <label className="CompaniesLabel">Nome</label>
        <input
          className="input"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          type="text"
        />
        <label className="CompaniesLabel">Endereço</label>
        <input
          className="input"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          type="text"
        />
        <label className="CompaniesLabel">Telefone</label>
        <input
          className="input"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          maxLength={11}
          onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }
          }
        />
        <label className="CompaniesLabel">CNPJ</label>
        <input
          className="input"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          type="text"
          maxLength={14}
        />
        <label className="CompaniesLabel">E-mail</label>
        <input
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          onFocus={() => setEmailTouched(true)}
        />
        {emailError && <p className="error">{emailError}</p>}
        <label className="CompaniesLabel">Senha</label>
        <input
          className="input"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          type="password"
        />
        <button className="button button-hover" onClick={register} disabled={!allFieldsFilled()}>
          <span className='button-text'>Criar conta</span>
        </button>
        <ReactModal
          ariaHideApp={false}
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Cadastro realizado com sucesso!"
          overlayClassName="modal-overlay"
          className="modal-content"
        >
          <div className="modal-header">
            Cadastro realizado com sucesso!
          </div>
          <div className="modal-body">
            Seu cadastro foi realizado com sucesso. Clique em Continuar para ser redirecionado a página de login.
          </div>
          <div className="modal-footer">
            <button className="button button-text button-hover" onClick={continueToLoginCompanies}>Continuar</button>
          </div>
        </ReactModal>
      </div>
    </>
  );
};

export default CompaniesCreateAccount;
