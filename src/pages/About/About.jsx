import { Link } from "react-router-dom";
import './About.css'

const About = () => {
    return (
        <div className="containerAbout">
          <div className="gradient">
            <div className="contentContainer">
              <h1 className="titleAbout">Sobre</h1>
              <p className="aboutText">
                O Cart Genius é uma aplicação que utiliza tecnologia de IA/Chatbot para auxiliar clientes de empresas a encontrar produtos de forma mais fácil e eficiente.
              </p>
              <p className="aboutText">
                Ao interagir com o nosso chat, os clientes podem fazer perguntas sobre produtos específicos, tais como características, preço, dentre outras informações relevantes. O sistema, por sua vez, utiliza técnicas de processamento de linguagem natural para entender o que o cliente está buscando e fornecer respostas precisas e personalizadas em tempo real.
              </p>
              <p className="aboutText">
                Para experimentar o nosso chat Cart Genius e ter uma experiência de compras inovadora, <Link to='/create-account' className="linkTextAbout">clique aqui</Link>.
              </p>
              <div className="creditsContainer">
                <h2 className="creditsTitle">Feito por:</h2>
                <p className="creditsText">Jorge Camara (RM93739)</p>
                <p className="creditsText">Filipe Santos (RM94377)</p>
                <p className="creditsText">Vitor Madureira (RM94036)</p>
              </div>
            </div>
          </div>
        </div>
    );
};

export default About;