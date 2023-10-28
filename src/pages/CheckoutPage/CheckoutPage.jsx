import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Menu from "../../components/Menu/Menu";
import ReactModal from 'react-modal';
import './CheckoutPage.css';
import VisaLogo from '../../assets/images/visa.png';
import MasterCardLogo from '../../assets/images/mastercard.png'
import BlankCard from '../../assets/images/blank-card.png'
import axios from 'axios';

const CheckoutPage = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [installments, setInstallments] = useState([]);
    const [selectedInstallment, setSelectedInstallment] = useState('');

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const location = useLocation();
    const userId = localStorage.getItem('userId');
    const cartItems = location.state ? location.state.cartItems : [];
    const totalPrice = location.state ? location.state.total : 0;

    const [cardType, setCardType] = useState('');

    const isDropdownDisabled = !(cardNumber && cardName && expiryDate && cvv);
    const isButtonDisabled = !(cardNumber && cardName && expiryDate && cvv && selectedInstallment);

    useEffect(() => {
        if (cardNumber.startsWith('4')) {
            setCardType('VISA');
        } else if (cardNumber.startsWith('5')) {
            setCardType('MasterCard');
        } else {
            setCardType('');
        }
    }, [cardNumber]);

    useEffect(() => {
        if (cardNumber && cardName && expiryDate && cvv) {
            let tempInstallments = [];
            for (let i = 1; i <= 6; i++) {
                tempInstallments.push({
                    value: i,
                    label: `${i} parcela(s) de R$ ${(totalPrice / i).toFixed(2)}`
                });
            }
            setInstallments(tempInstallments);
        }
    }, [cardNumber, cardName, expiryDate, cvv]);

    const handleCardNumberChange = (e) => {
        let value = e.target.value;
        // Remove quaisquer caracteres não numéricos e espaços
        value = value.replace(/\D+/g, '');
    
        // Adicione um espaço após cada 4 dígitos
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    
        // Certifique-se de que o valor tenha no máximo 19 caracteres (16 dígitos + 3 espaços)
        if (value.length <= 19) {
            setCardNumber(value);
        }
    };

    const createOrderObject = () => {
        return {
            "produtos": cartItems.map(item => ({
                "idProduto": item.ProdutoId,
                "empresaId": item.Empresa,
                "quantidade": 1,
                "preco": item.Preco,
                "comissao": item.Preco * 0.01
            })),
            "parcelado": selectedInstallment > 1,
            "numeroParcelas": selectedInstallment,
            "valorParcela": (totalPrice / selectedInstallment).toFixed(2),
            "totalVenda": totalPrice,
            "comissao": totalPrice * 0.01,
            "clienteId": userId
        };
    };

    const continueAfterBuying = () => {
        setModalIsOpen(false);
        window.location.href = '/';
    };
    
    const handlePurchase = async () => {
        const order = createOrderObject();

        console.log("Objeto enviado para a API:", order);     
        try {
            // http://20.226.8.137:8080/vendas/ || /vendas/
            const response = await axios.post('/vendas/', order, {
                timeout: 60000
            });
            setModalIsOpen(true);
            window.alert("Compra realizada com sucesso!");
        } catch (error) {
            console.error("Erro ao realizar a compra:", error);
            window.alert("Erro ao realizar a compra");
        }
    };

    return (
        <>
            <Menu />
            <div className="checkout-container">
                <div className="card-preview">
                    <div className="card-number">
                        {cardNumber || '#### #### #### ####'}
                        <img 
                            src={cardType === 'VISA' ? `${VisaLogo}` : cardType === 'MasterCard' ? `${MasterCardLogo}` : `${BlankCard}`} 
                            alt="Ícone da bandeira do cartão" 
                            className="card-icon" 
                        />
                    </div>
                    <div className="card-info">
                        <div className="card-name">
                            {cardName || 'NOME NO CARTÃO'}
                        </div>
                        <div className="card-cvv">
                            {cvv || '###'}
                        </div>
                    </div>
                    <div>
                        <div className="card-expiry">
                            {expiryDate || 'MM / AA'}
                        </div>
                    </div>
                </div>
                <h2 className='checkoutPageCardInfoTitle'>Informações do Cartão</h2>

                <input 
                    type="text" 
                    placeholder="Número do cartão" 
                    value={cardNumber} 
                    onChange={handleCardNumberChange}
                    className="card-input"
                    maxLength={19}
                />
                <input 
                    type="text" 
                    placeholder="Nome no cartão" 
                    value={cardName} 
                    onChange={e => setCardName(e.target.value)}
                    className="card-input"
                    minLength={5}
                />
                <input 
                    type="text" 
                    placeholder="MM / AA"
                    maxLength={7}
                    value={expiryDate} 
                    onChange={e => {
                        const value = e.target.value;
                        const lastValue = expiryDate;
                        if (value.length === 2 && !value.includes('/') && lastValue.length !== 3) {
                            setExpiryDate(value + ' / ');
                        } else if (value.length === 2 && value.includes(' / ')) {
                            setExpiryDate(value.slice(0,1));
                        } else {
                            setExpiryDate(value);
                        }
                    }}
                    className="card-input"
                />
                <input 
                    type="text" 
                    placeholder="CVV"
                    maxLength={3}
                    value={cvv} 
                    onChange={e => setCvv(e.target.value)}
                    className="card-input"
                />
                <select 
                    className="installments-dropdown" 
                    disabled={isDropdownDisabled}
                    value={selectedInstallment}
                    onChange={e => setSelectedInstallment(e.target.value)}
                >
                    <option value="">Selecione as parcelas</option>
                    {installments.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <p className="total-checkout">Total: R$ {totalPrice.toFixed(2)}</p>
                <button className="buy-button" disabled={isButtonDisabled} onClick={handlePurchase}>Comprar</button>
                <Link to={`/user-page/${userId}/chat`} className="back-link">Voltar ao chat</Link>
                <ReactModal
                    ariaHideApp={false}
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Comppra realizada com sucesso!"
                    overlayClassName="modal-overlay"
                    className="modal-content"
                    >
                    <div className="modal-header">
                        Compra realizada com sucesso!
                    </div>
                    <div className="modal-body">
                        Sua compra foi realizada com sucesso. Clique em Continuar fechar esse aviso.
                    </div>
                    <div className="modal-footer">
                        <button className="button button-text button-hover" onClick={continueAfterBuying}>Continuar</button>
                    </div>
                </ReactModal>
            </div>
        </>
    );
}

export default CheckoutPage;
