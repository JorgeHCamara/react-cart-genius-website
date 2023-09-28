import { useState, useEffect } from 'react';

const SpeechToText = ({setUserInput}) => {
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognitionInstance = new SpeechRecognition();

        recognitionInstance.lang = 'pt-BR';
        recognitionInstance.onstart = () => {
            console.log('Voice is being recognized...');
        };

        recognitionInstance.onresult = (event) => {
            const transcriptArray = Array.from(event.results);
            const sentence = transcriptArray.map(n => n[0].transcript).join('');
            setUserInput(sentence);
        };

        recognitionInstance.onspeechend = () => {
            console.log('Speech has stopped being detected');
            setIsListening(false);
        };

        setRecognition(recognitionInstance);

        // Função de limpeza para descartar a instância de reconhecimento ao desmontar
        return () => {
            recognitionInstance.onspeechend = null;  // Limpa o evento onspeechend
            recognitionInstance.onresult = null;     // Limpa o evento onresult
            recognitionInstance.onstart = null;      // Limpa o evento onstart
        };
    }, [setUserInput]);

    const startListening = () => {
        if (recognition) {
            recognition.start();
            setIsListening(true);
        }
    };

    const stopListening = () => {
        if (recognition) {
            recognition.stop();
            setIsListening(false);
        }
    };

    return {
        isListening,
        startListening,
        stopListening
    };
};

export default SpeechToText;
