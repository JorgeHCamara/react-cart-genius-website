import heroImage from '../../../assets/images/hero-image.jpeg'
import './Hero.css'


const Hero = () => {


    return(
        <div className='heroContainer'>
            <div className="heroText">
                <h2>
                    Transformando Carrinhos em Conversas,
                    e Conversas em Compras.
                </h2>
                <button>Comece agora</button>
            </div>
            <div className="heroImage">
                <img src={heroImage} alt="Logo" />
            </div>
        </div>
    )

}

export default Hero;