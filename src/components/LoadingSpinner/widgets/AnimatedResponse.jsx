import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const AnimatedResponse = ({ message }) => {
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const messageLength = message.length;

    const intervalId = setInterval(() => {
      if (currentIndex < messageLength) {
        setDisplayedMessage(message.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, 35); // Adjust the delay (in milliseconds) between each letter

    return () => clearInterval(intervalId);
  }, [message, currentIndex]);

  return(
    <p className="responseText">
      <strong>Cart Genius:</strong> {displayedMessage}
    </p>
  )
};

AnimatedResponse.propTypes = {
    message: PropTypes.string.isRequired, // Expecting 'message' prop to be a string
  };

export default AnimatedResponse;
