import React, { useState } from 'react';
import './ChatPage.css'; // Import your CSS file
import axios from 'axios'; // Import Axios or use fetch for API requests

const ChatPage = () => {
    const [userInput, setUserInput] = useState('');
    const [responses, setResponses] = useState([]);
    const [userConversation, setUserConversation] = useState([]);
    const [conversation, setConversation] = useState([]);

    const userMessage = { user: 'Cliente', input: userInput };

    const callApi = async () => {
        console.log("User input:", userInput);

        // Create message objects for user input and Cart Genius's response

        // Update the conversation state by appending the user's input
        setUserConversation([...userConversation, userMessage]);

        try {
            const response = await axios.post('http://20.226.206.195:8000/query', {
                query: userInput
            });

            console.log("Data received from API:", response.data);

            // Create a message object for Cart Genius's response
            const geniusMessage = { speaker: 'Cart Genius', message: response.data.response };

            // Append Cart Genius's response to the conversation
            setConversation([...conversation, geniusMessage]);

            setResponses([...responses, response.data.response]);

            // Clear the user input after a successful API response
            setUserInput('');

        } catch (error) {
            console.error('An error occurred while accessing the API:', error);
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
                        <p className="responseText">
                            <strong>{conversation[index].speaker}:</strong> {conversation[index].message}
                        </p>
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
                />
                <button className="sendButton" onClick={callApi}>
                   <span className="sendButtonText">Enviar</span>
                </button>
            </div>
        </div>
    );
};

export default ChatPage;
