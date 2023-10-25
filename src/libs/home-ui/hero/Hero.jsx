import heroImage from '../../../assets/images/hero-image.jpeg'
import './Hero.css'
import { Link } from 'react-router-dom'


const Hero = () => {


    return(
        <div className='heroContainer'>
            <div className="heroText">
                <h2>
                    Transformando Carrinhos em Conversas,
                    e Conversas em Compras.
                </h2>
                <div className='heroButtonDiv'>
                    <Link className='heroButton' to='/login'>Comece agora</Link>
                </div>
            </div>
            <div className="heroImage">
                <img src={heroImage} alt="Logo" />
            </div>
        </div>
    )

}

export default Hero;