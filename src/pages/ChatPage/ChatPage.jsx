import React, { useState, useRef } from 'react';
import './ChatPage.css';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import AnimatedResponse from '../../widgets/AnimatedResponse';
import SpeechToText from '../../components/SpeechToText/SpeechToText';
import Menu from '../../components/Menu/Menu';
import { useNavigate, useParams } from 'react-router-dom';

const ChatPage = () => {
    const [userInput, setUserInput] = useState('');
    const [responses, setResponses] = useState([]);
    const [userConversation, setUserConversation] = useState([]);
    const [conversation, setConversation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    
    const navigate = useNavigate();
    const { userId } = useParams();

    const { isListening, startListening, stopListening } = SpeechToText({ setUserInput });

    const inputRef = useRef(null);

    const userMessage = { user: 'Cliente', input: userInput };

    const callApi = async () => {
        console.log("User input:", userInput);

        // Update the conversation state by appending the user's input
        setUserConversation([...userConversation, userMessage]);

        setLoading(true);

        setUserInput('');

        try { //api/query || http://20.226.8.137:5000/query
            const response = await axios.post('http://20.226.8.137:5000/query', {
                query: userInput
            });
        
            let geniusMessage;
            if (response.data.Nome) {
                // Se a resposta é um objeto de produto, adicione-a ao carrinho
                setCartItems(prevItems => [...prevItems, response.data]);
                setTotal(prevTotal => prevTotal + parseFloat(response.data.Preco));
                
                geniusMessage = {
                    speaker: 'Cart Genius',
                    message: `Produto ${response.data.Nome} adicionado ao carrinho!`,
                    isImageUrl: false
                };
            } else {
                const apiResponse = response.data.response;
                geniusMessage = {
                    speaker: 'Cart Genius',
                    message: apiResponse,
                    isImageUrl: isUrl(apiResponse)
                };
            }
        
            setConversation([...conversation, geniusMessage]);
        
            setResponses([...responses, geniusMessage.message]);
        
        } catch (error) {
            console.error('An error occurred while accessing the API:', error);
        } finally {
            setLoading(false);
            focusInput();
        }
    };

    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleCheckout = () => {
        navigate(`/user-page/${userId}/chat/checkout`, { state: { total, cartItems } });
    }

    function isUrl(str) {
        try {
            new URL(str);
            return /\.(jpeg|jpg|gif|png)$/.test(str);
        } catch (e) {
            return false;
        }
    }

    return (
        <>
        <Menu />
        <div className="containerChatPage">
            <div className="container-cart">
                <h2>Carrinho de Compras</h2>
                <div className="products-list-container">
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.Nome} className="product-card">
                                <img className="product-image" src={item.Imagem} alt={item.Nome} />
                                <div className="product-details">
                                    <span className="product-name">{item.Nome}</span>
                                    <span className="product-price">R$ {item.Preco}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="cart-footer">
                    <p className="cart-total">Total: R$ {total.toFixed(2)}</p>
                    <button className="checkout-button" disabled={cartItems.length === 0} onClick={handleCheckout}>
                        Finalizar compra
                    </button>
                </div>
            </div>
            <div className="container-chat">
                <div className="firstView">
                    <p className="responseText">
                        <strong>Cart Genius:</strong> Olá, como posso te ajudar?
                    </p>
                    {userConversation.map((userMessage, index) => (
                        <React.Fragment key={index}>
                            <p className="responseText">
                                <strong>{userMessage.user}:</strong> {userMessage.input}
                            </p>
                            {conversation[index] && (
                                <AnimatedResponse 
                                    message={conversation[index].message} 
                                    isImageUrl={conversation[index].isImageUrl}
                                    onImageClick={image => setSelectedImage(image)}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>
                {loading && <LoadingSpinner />}
                <div className="inputContainer">
                    <div className="inputWrapper">
                        <input
                            className="input-chat"
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    callApi();
                                }
                            }}
                            ref={inputRef}
                            placeholder='Faça seu pedido'
                        />
                        {isListening ? (
                            <button className="voiceButton" onClick={stopListening}>
                                <i className="fa fa-microphone-slash"></i>
                            </button>
                        ) : (
                            <button className="voiceButton" onClick={startListening}>
                                <i className="fa fa-microphone"></i>
                            </button>
                        )}
                    </div>
                    <button className="sendButton" onClick={callApi}>
                        <i className="fa fa-paper-plane"></i>
                    </button>
                </div>
                {selectedImage && (
                    <div className="modalProductImage" onClick={() => setSelectedImage(null)}>
                        <img src={selectedImage} alt="Expanded Product" style={{ maxWidth: '100%', height: 'auto' }} />
                    </div>
                )}
            </div>
        </div>
        </>
    );
};

export default ChatPage;
