import './About.css'
import { useInView } from 'react-intersection-observer';

const About = () => {

    const [ref, inView] = useInView({
      triggerOnce: true, // Animação só ocorre uma vez
      threshold: 0.6     // Ativa a animação quando 10% do elemento está visível
    });

    return (
        <div className="containerAbout" id="about" ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(-30px)' }}>
          <div className="gradient">
            <div className="contentContainer">
              <h1 className="titleAbout">O <span className='abt-txt-color'>Cart Genius</span> é uma startup que<br /> busca mudar a maneira que<br /> você faz as suas compras online.</h1>
              <p className="aboutText">
              Nossa plataforma é como um shopping virtual onde um assistente virtual, semelhante a um vendedor, ajuda os clientes a encontrar produtos. Ao conversar com esse assistente, os clientes podem perguntar sobre detalhes, preços e outras informações dos produtos. Esse assistente é muito inteligente e entende exatamente o que o cliente quer, dando respostas rápidas e personalizadas.
              </p>
            </div>
          </div>
        </div>
    );
};

export default About;