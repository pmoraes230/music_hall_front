import './Home.css';
import NavBarPage from 'components/navBarPage';
import ContainerCards from 'components/ContainerCards';
import Carousel from 'components/Carousel';
import FooterHome from 'components/Footers/FooterHome';
import { useState, useEffect } from 'react';

export const Home = () => {
    const [colorIndex, setColorIndex] = useState(0); // Estado para controlar o índice da cor
    const colors = ['color_laranja', 'color_mostarda', 'color_laranja_escuro', 'color_marrom', 'color_escuro'];

    useEffect(() => {
        const interval = setInterval(() => {
            setColorIndex((prevIndex) => (prevIndex + 1) % colors.length); // Alterna entre as cores
        }, 1000);

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }, [colors.length]);

    return (
        <div>
            <main className='content_home'>
                <NavBarPage />
                <div className="container_title">
                    <h1 className="title_main">
                        Senac <span className={`title_home ${colors[colorIndex]}`}>Music Hall</span>
                    </h1>
                    <figure className="arrow_home"><img src="/icons/arrow.svg" alt="arrow_home" /></figure>
                </div>
            </main>

            <section className="container container_agenda">
                <h1 className="sub_title space center">Evento em agenda</h1>

                <div className="container-fluid cards_container">
                    <ContainerCards img="/images/article_1.png" altImg="Imagem-Article-1" name="Soney" Show="Jazz com café" category="Livre" />
                    <ContainerCards img="/images/article_2.png" altImg="Imagem-Article-2" name="Huixa" Show="Rock" category="12+" />
                    <ContainerCards img="/images/article_3.png" altImg="Imagem-Article-3" name="Dicae" Show="Alternativo" category="Livre" />
                    <ContainerCards img="/images/article_4.png" altImg="Imagem-Article-4" name="Liari" Show="Jazz com café" category="Livre" />
                </div>
            </section>

            <section className='container container_carousel'>
                <Carousel />
            </section>

            <FooterHome />
        </div>
    );
};