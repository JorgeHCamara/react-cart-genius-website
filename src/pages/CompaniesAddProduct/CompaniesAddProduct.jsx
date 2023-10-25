/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';
import './CompaniesAddProduct.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';
import Papa from 'papaparse';
import CSVExample from '../../assets/images/csv-exemplo.png'

const CompaniesAddProduct = () => {
    const { companyId } = useParams();

    useEffect(() => {
        document.body.classList.add('white-background');

        return () => {
            document.body.classList.remove('white-background');
        };
    }, []);

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [marca, setMarca] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagem, setImagem] = useState('');
  const [csvFile, setCsvFile] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [csvModalIsOpen, setCsvModalIsOpen] = useState(false);
  const [csvExampleModalIsOpen, setCsvExampleModalIsOpen] = useState(false);

  const register = async () => {
    let url = `http://20.226.8.137:8080/empresas/${companyId}/produtos/cadastro`;
    let data = {
      nome: nome,
      descricao: descricao,
      preco: preco,
      marca: marca,
      categoria: categoria,
      imagem: imagem
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

  const continueToLogin = () => {
    setModalIsOpen(false);
    window.location.href = `/companies-page/${companyId}`;
  };

  const allFieldsFilled = () => {
    const commonFields = nome && descricao && preco && marca && categoria && imagem;
    return commonFields;
  };

  const openCsvExampleModal = () => {
    setCsvExampleModalIsOpen(true);
  };
  
  const closeCsvExampleModal = () => {
    setCsvExampleModalIsOpen(false);
  };

    const handleCSVUpload = async () => {
        // Convertendo o CSV para um array de objetos
        Papa.parse(csvFile, {
            header: true,
            skipEmptyLines: true,
            complete: async function(results) {
                // Transformação dos dados
                const transformedData = results.data.map(item => ({
                    nome: item.Nome,
                    marca: item.Marca,
                    categoria: item.Categoria.trim(),
                    descricao: item.Descricao,
                    preco: parseFloat(item.Preco),
                    imagem: item.Imagem,
                    empresaId: companyId
                }));

                // Envio para a API
                for (const data of transformedData) {
                    try {
                        const url = `http://20.226.8.137:8080/empresas/${companyId}/produtos/cadastro`;
                        const response = await axios.post(url, data);
                        console.log("Data sent successfully:", response);
                    } catch (error) {
                        console.error("Error sending data:", error);
                    }
                }
                setCsvModalIsOpen(true);
            }
        });
    };

    const continueAfterCsv = () => {
        setCsvModalIsOpen(false);
        window.location.href = `/companies-page/${companyId}`;
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
        <label className="CompaniesLabel">Descrição</label>
        <input
          className="input"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          type="text"
        />
        <label className="CompaniesLabel">Preço (R$)</label>
        <input
          className="input"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          maxLength={11}
          onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }
          }
        />
        <label className="CompaniesLabel">Marca</label>
        <input
          className="input"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          type="text"
          maxLength={14}
        />
        <label className="CompaniesLabel">Categoria</label>
        <input
          className="input"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          type="text"
        />
        <label className="CompaniesLabel">Link da Imagem</label>
        <input
          className="input"
          value={imagem}
          onChange={(e) => setImagem(e.target.value)}
          type="text"
        />
        <label className="CompaniesLabel">Adicionar mais de um produto via CSV <span className="csv-example-link" onClick={openCsvExampleModal}> (Exemplo)</span></label>
        <input
            className="input"
            type="file"
            accept=".csv"
            onChange={(e) => setCsvFile(e.target.files[0])}
        />
        <button className="button button-hover" onClick={handleCSVUpload} disabled={!csvFile}>
            <span className='button-text'>Enviar CSV</span>
        </button>
        <button className="button button-hover" onClick={register} disabled={!allFieldsFilled()}>
          <span className='button-text'>Cadastrar produto</span>
        </button>
        <ReactModal
            ariaHideApp={false}
            isOpen={csvExampleModalIsOpen}
            onRequestClose={closeCsvExampleModal}
            contentLabel="Exemplo de CSV"
            overlayClassName="csv-modal-overlay"
            className="csv-modal-content"
            >
            <div className="csv-modal-body">
                <img src={CSVExample} alt="Exemplo CSV" style={{ width: '100%', cursor: 'pointer' }} onClick={closeCsvExampleModal} />
            </div>
        </ReactModal>
        <ReactModal
            ariaHideApp={false}
            isOpen={csvModalIsOpen}
            onRequestClose={() => setCsvModalIsOpen(false)}
            contentLabel="Upload de CSV realizado com sucesso!"
            overlayClassName="modal-overlay"
            className="modal-content"
            >
            <div className="modal-header">
                Upload de CSV realizado com sucesso!
            </div>
            <div className="modal-body">
                Seus produtos foram cadastrados com sucesso via CSV. Clique em Continuar para ser redirecionado à página inicial.
            </div>
            <div className="modal-footer">
                <button className="button button-text button-hover" onClick={continueAfterCsv}>Continuar</button>
            </div>
        </ReactModal>
        <ReactModal
          ariaHideApp={false}
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Produto cadastrado realizado com sucesso!"
          overlayClassName="modal-overlay"
          className="modal-content"
        >
          <div className="modal-header">
            Produto cadastrado com sucesso!
          </div>
          <div className="modal-body">
            Seu produto foi cadastrado com sucesso. Clique em Continuar para ser redirecionado a página de inicial.
          </div>
          <div className="modal-footer">
            <button className="button button-text button-hover" onClick={continueToLogin}>Continuar</button>
          </div>
        </ReactModal>
      </div>
    </>
  );
};

export default CompaniesAddProduct;
