import React, { useState, useRef } from 'react';
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

    const inputRef = useRef(null);

    const userMessage = { user: 'Cliente', input: userInput };

    const callApi = async () => {
        console.log("User input:", userInput);

        // Update the conversation state by appending the user's input
        setUserConversation([...userConversation, userMessage]);

        setLoading(true);

        setUserInput('');

        try {
            const response = await axios.post('http://rm94377dns.brazilsouth.azurecontainer.io:8000/query', {
                query: userInput
            });

            console.log("Data received from API:", response.data);

            const geniusMessage = { speaker: 'Cart Genius', message: response.data.response };

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
                            <AnimatedResponse message={conversation[index].message} />
                        )}
                    </React.Fragment>
                ))}
            </div>
            <div className="inputContainer">
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
                <button className="sendButton" onClick={callApi}>
                    <i className="fa fa-paper-plane"></i>
                </button>
            </div>
            {loading && <LoadingSpinner />}
        </div>
    );
};

export default ChatPage;
