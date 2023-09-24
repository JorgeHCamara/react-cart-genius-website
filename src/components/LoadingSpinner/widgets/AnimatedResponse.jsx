import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const AnimatedResponse = ({ message, isImageUrl }) => {
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const messageLength = message.length;

    if (isImageUrl) {
      setDisplayedMessage(message);
      console.log(isImageUrl)
      return;
    }

    const intervalId = setInterval(() => {
      if (currentIndex < messageLength) {
        setDisplayedMessage(message.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, 20); // Adjust the delay (in milliseconds) between each letter

    return () => clearInterval(intervalId);
  }, [message, currentIndex, isImageUrl]);

  return(
    <div className="responseText">
      <strong>Cart Genius:</strong>
      {isImageUrl ? (
        <img src={message} alt="Product" style={{ maxWidth: '100%', height: 'auto' }} />
      ) : (
        <p>{displayedMessage}</p>
      )}
    </div>
  )
};

AnimatedResponse.propTypes = {
    message: PropTypes.string.isRequired,
    isImageUrl: PropTypes.bool.isRequired,
  };

export default AnimatedResponse;
