import './VideoComponent.css';
import videoExemplo from '../../../assets/videos/video-exemplo.mp4'

const VideoComponent = () => {
    return (
        <div className="textVideoContainer">
            <div className="textContent">
                <h2>Como funciona?</h2>
                <p>Confira no vídeo a seguir uma demonstração prática de como funciona o processo de compra através do chat do Cart Genius. Nossa plataforma é projetada para tornar suas compras mais rápidas, fáceis e intuitivas.</p>
            </div>
            <div className="videoContent">
                <video controls src={videoExemplo}></video>
            </div>
        </div>
    );
};

export default VideoComponent;
