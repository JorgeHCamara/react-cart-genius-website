/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateAccount.css'

const CreateAccount = () => {
  const [personType, setPersonType] = useState('');

  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cpf, setCpf] = useState('');
  const [cnpj, setCnpj] = useState('');

  const [emailError, setEmailError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  useEffect(() => {
    const emailRegex = /\S+@\S+\.\S+/;
    const validEmail = emailRegex.test(email);

    if (emailTouched) {
      setEmailError(validEmail ? '' : 'Informe um e-mail válido.');
    }
  }, [email, telefone, emailTouched]);

  const register = async () => {
    let url = `https://rm94377webapp.azurewebsites.net/${personType}/`;
    let data;

    if (personType === 'clientes') {
      data = {
        nome,
        endereco,
        telefone,
        cpf,
        email,
        senha,
      };
    } else if (personType === 'empresas') {
      data = {
        nome,
        endereco,
        telefone,
        email,
        cnpj,
        senha
      };
    }

    try {
      const response = await axios.post(url, data);
    } catch (error) {
      console.log(error.response.data);
      console.log(url);
      console.log(data);
    }
  };

  return (
    <div className="container">
      <label className="label">Tipo de Cadastro</label>
      <select
        className="input"
        value={personType}
        onChange={(e) => setPersonType(e.target.value)}
      >
        <option value="">Selecione o tipo de cadastro</option>
        <option value="clientes">Cliente</option>
        <option value="empresas">Empresa</option>
      </select>

      {personType === 'clientes' && (
        <>
          <label className="label">Nome</label>
          <input
            className="input"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            type="text"
          />
          <label className="label">Endereço</label>
          <input
            className="input"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            type="text"
          />
          <label className="label">Telefone</label>
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
          <label className="label">CPF</label>
          <input
            className="input"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            type="text"
          />
          <label className="label">E-mail</label>
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            onFocus={() => setEmailTouched(true)}
          />
          {emailError && <p className="error">{emailError}</p>}
          <label className="label">Senha</label>
          <input
            className="input"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            type="password"
          />
        </>
      )}
      {personType === 'empresas' && (
        <>
          <label className="label">Nome</label>
          <input
            className="input"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            type="text"
          />
          <label className="label">Endereço</label>
          <input
            className="input"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            type="text"
          />
          <label className="label">Telefone</label>
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
          <label className="label">CNPJ</label>
          <input
            className="input"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            type="text"
          />
          <label className="label">E-mail</label>
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          {emailError && <p className="error">{emailError}</p>}
          <label className="label">Senha</label>
          <input
            className="input"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            type="password"
          />
        </>
      )}
      <button className="button" onClick={register}>
        <span className='button-text'>Criar conta</span>
      </button>
    </div>
  );
};

export default CreateAccount;
