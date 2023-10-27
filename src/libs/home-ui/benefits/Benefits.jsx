import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Benefits.css';
import RespRapidas from '../../../assets/images/respostas-rapidas.png';
import DiversidadeProdutos from '../../../assets/images/diversidade-de-produtos.png'
import Confiabilidade from '../../../assets/images/confiabilidade.png'

const BenefitItem = ({ icon, title, description, delay }) => (
    <div className="benefitItem" style={{
        animationName: delay >= 0 ? 'fadeInUp' : 'none',
        animationDelay: `${delay}s`
    }}>
        <img src={icon} alt={title} className="benefitIcon" />
        <p className="benefitTitle">{title}</p>
        <p className="benefitDescription">{description}</p>
        <Link to="/login" className="benefitButton">Saiba mais</Link>
    </div>
);

BenefitItem.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    delay: PropTypes.number.isRequired
};

const Benefits = () => {

    const [isVisible, setIsVisible] = useState(false);
    const benefitsRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(benefitsRef.current);
                }
            },
            {
                threshold: 0.1
            }
        );
    
        if (benefitsRef.current) {
            observer.observe(benefitsRef.current);
        }
    
        return () => {
            if (benefitsRef.current) {
                observer.unobserve(benefitsRef.current);
            }
        };
    }, []);

    const benefitsData = [
        { icon: `${RespRapidas}`, title: 'Respostas Rápidas', description: 'Receba respostas imediatas para suas dúvidas e tome decisões mais rápidas.' },
        { icon: `${DiversidadeProdutos}`, title: 'Diversidade de Produtos', description: 'Navegue por uma vasta seleção de produtos para atender a todas as suas necessidades.' },
        { icon: `${Confiabilidade}`, title: 'Compre com Confiabilidade', description: 'Desfrute de compras seguras com produtos de alta qualidade e serviço confiável.' },
    ];

    return (
        <div className="benefitsContainer" id="benefits" ref={benefitsRef}>
            {benefitsData.map((benefit, index) => (
                <BenefitItem
                    key={index}
                    {...benefit}
                    delay={isVisible ? index * 0.5 : 0}
                />
            ))}
        </div>
    );
};

export default Benefits;
