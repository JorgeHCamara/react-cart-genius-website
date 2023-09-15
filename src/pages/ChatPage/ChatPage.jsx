import { useState } from 'react';
import './ChatPage.css'; // Import your CSS file
import axios from 'axios'; // Import Axios or use fetch for API requests

const ChatPage = () => {
    const [userInput, setUserInput] = useState('');
    const [responses, setResponses] = useState([]);
    const [conversation, setConversation] = useState([]);

    const callApi = async () => {
        console.log("User input:", userInput);

        try {
            const response = await axios.post('http://20.226.206.195:8000/query', {
                query: userInput
            });

            console.log("Data received from API:", response.data);

            setConversation([
                ...conversation,
                { speaker: 'Cliente', message: userInput },
                { speaker: 'Cart Genius', message: response.data.response },
              ]);

            setResponses([...responses, response.data.response]);

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
                {conversation.map((item, index) => (
                    <p className="responseText" key={index}>
                    <strong>{item.speaker}:</strong> {item.message}
                </p>
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
