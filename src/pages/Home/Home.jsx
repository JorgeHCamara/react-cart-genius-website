import { /*Link, useNavigate*/ } from 'react-router-dom';
import Hero from '../../libs/home-ui/hero/Hero';
import Menu from '../../components/Menu/Menu'
import About from '../../libs/home-ui/about/About';
import Benefits from '../../libs/home-ui/benefits/Benefits';
import Footer from '../../libs/shared-ui/footer/Footer';
import { useEffect } from 'react'

const Home = () => {
    //const navigate = useNavigate();

    useEffect(() => {
        if (window.location.hash === "#about") {
            const aboutSection = document.getElementById("about");
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" });
            }
        }

    }, []);

    useEffect(() => {
        if (window.location.hash === "#benefits") {
            const benefitsSection = document.getElementById("benefits");
            if (benefitsSection) {
                benefitsSection.scrollIntoView({ behavior: "smooth" });
            }
        }

    }, []);

    return (
        <div>
            <Menu />
            <Hero  />
            <About />
            <Benefits />
            <Footer />
        </div>
    );
};

export default Home;