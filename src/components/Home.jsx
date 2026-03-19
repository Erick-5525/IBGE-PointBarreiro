import { useEffect, useState } from 'react';
import './home.css';

export const Home = () => {
    const [ranking, setRanking] = useState([]);
    const [noticias, setNoticias] = useState([]);

    useEffect(() => {
        fetch('https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking?qtd=10')
            .then(res => res.json())
            .then(data => setRanking(data[0].res))
            .catch(err => console.error("Erro ao carregar nomes:", err));

        fetch('https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=3')
            .then(res => res.json())
            .then(data => setNoticias(data.items))
            .catch(err => console.error("Erro ao carregar notícias:", err));
    }, []);

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Lobby de Dados IBGE</h1>
                <p>Informações oficiais e curiosidades do Brasil</p>
            </header>

            <div className="home-top-cards">
                <div className="badge-card blue">
                    <span>Fonte de Dados</span>
                    <strong>IBGE Oficial</strong>
                </div>
                <div className="badge-card green">
                    <span>Território</span>
                    <strong>Brasil</strong>
                </div>
            </div>

            <main className="home-content">
                <section className="section-ranking">
                    <h3>Top 10 Nomes (Censo)</h3>
                    <ul className="ranking-list">
                        {ranking.map((nome, index) => (
                            <li key={index} className="ranking-item">
                                <strong>{index + 1}º {nome.nome}</strong>
                                <span className="frequencia">{nome.frequencia.toLocaleString()}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="section-news">
                    <h3>Últimas Notícias</h3>
                    {noticias.length > 0 ? noticias.map((item) => (
                        <article key={item.id} className="news-article">
                            <h4>{item.titulo}</h4>
                            <p>{item.introducao.substring(0, 160)}...</p>
                            <a href={item.link} target="_blank" rel="noreferrer">
                                Ler notícia completa →
                            </a>
                        </article>
                    )) : <p className="loading-text">Carregando notícias...</p>}
                </section>
            </main>
        </div>
    );
};