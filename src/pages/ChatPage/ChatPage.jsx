import React, { useState, useRef, useEffect } from 'react';
import './ChatPage.css';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import AnimatedResponse from '../../components/LoadingSpinner/widgets/AnimatedResponse';

const ChatPage = () => {
    const [userInput, setUserInput] = useState('');
    const [responses, setResponses] = useState([]);
    const [userConversation, setUserConversation] = useState([]);
    const [conversation, setConversation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const [isListening, setIsListening] = useState(false);

    const inputRef = useRef(null);

    const userMessage = { user: 'Cliente', input: userInput };

    const callApi = async () => {
        console.log("User input:", userInput);

        // Update the conversation state by appending the user's input
        setUserConversation([...userConversation, userMessage]);

        setLoading(true);

        setUserInput('');

        try {
            const response = await axios.post('http://20.226.74.28:8080/query', {
                query: userInput
            });

            console.log("Data received from API:", response.data);

            console.log('Response from API:', response.data.response);  // Log the response from the API
            console.log('Is URL:', isUrl(response.data.response));

            const geniusMessage = { speaker: 'Cart Genius', message: response.data.response, isImageUrl: isUrl(response.data.response) };

            setConversation([...conversation, geniusMessage]);

            setResponses([...responses, response.data.response]);

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

    function isUrl(str) {
        try {
            new URL(str);
            return /\.(jpeg|jpg|gif|png)$/.test(str);
        } catch (e) {
            return false;
        }
    }

    const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = () => {
    console.log('Voice is being recognized...');
};

recognition.onresult = (event) => {
    const transcriptArray = Array.from(event.results);
    const sentence = transcriptArray.map(n => n[0].transcript).join('');
    setUserInput(sentence);
};

const startListening = () => {
    recognition.start();
    setIsListening(true);
};

const stopListening = () => {
    recognition.stop();
    setIsListening(false);
};

useEffect(() => {
    recognition.lang = 'pt-BR';
}, []);

    return (
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
            {loading && <LoadingSpinner />}
            {selectedImage && (
                <div className="modalProductImage" onClick={() => setSelectedImage(null)}>
                    <img src={selectedImage} alt="Expanded Product" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
            )}
        </div>
    );
};

export default ChatPage;
