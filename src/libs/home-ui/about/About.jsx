import './About.css'
import { useInView } from 'react-intersection-observer';

const About = () => {

    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.5    
    });

    return (
        <div className="containerAbout" id="about" ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(-30px)' }}>
          <div className="gradient">
            <div className="contentContainer">
              <h1 className="titleAbout">O <span className='abt-txt-color'>Cart Genius</span> é uma startup que busca mudar a maneira que você faz as suas compras online.</h1>
              <p className="aboutText">
              Nossa plataforma é como um shopping virtual onde um assistente virtual, semelhante a um vendedor, ajuda os clientes a encontrar produtos. Ao conversar com esse assistente, os clientes podem perguntar sobre detalhes, preços e outras informações dos produtos.
              </p>
            </div>
          </div>
        </div>
    );
};

export default About;