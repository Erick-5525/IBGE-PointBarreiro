import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIbgeData, clearMunicipios } from './Slice';
import './apireceiver.css';

export const ApiReceiver = () => {
    const params = useParams();
    const endpoint = params['*'];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getStoreKey = () => {
        if (endpoint === 'regioes') return 'regioes';
        if (endpoint?.includes('municipios')) return 'municipios';
        return 'estados';
    };

    const storeKey = getStoreKey();
    const data = useSelector((state) => state.ibge[storeKey]);
    const todosEstados = useSelector((state) => state.ibge.estados);
    const { loading, error } = useSelector((state) => state.ibge);

    useEffect(() => {
        if (endpoint) {
            dispatch(fetchIbgeData(endpoint));
        }
        if (endpoint === 'regioes' && todosEstados.length === 0) {
            dispatch(fetchIbgeData('estados'));
        }

        return () => {
            if (endpoint?.includes('municipios')) {
                dispatch(clearMunicipios());
            }
        };
    }, [endpoint, dispatch, todosEstados.length]);

    const irParaMunicipios = (idUF) => {
        dispatch(clearMunicipios());
        navigate(`/consulta/estados/${idUF}/municipios`);
    };

    if (loading && (!data || data.length === 0)) return <h2 className="status-msg">Carregando dados...</h2>;
    if (error) return <h2 className="status-msg error">{error}</h2>;

    return (
        <div className="container-api">
            <div className="header-api">
                <button className="btn-voltar" onClick={() => navigate(-1)}>
                    ← Voltar
                </button>
                <h2 className="titulo-secao">
                    {endpoint === 'regioes' ? 'Regiões e seus Estados' : 
                     endpoint.includes('municipios') ? 'Municípios Encontrados' : 'Resultados da Consulta'}
                </h2>
            </div>
            
            <ul className="lista-dados">
                {data.map((item) => {
                    const estadosDaRegiao = endpoint === 'regioes' 
                        ? todosEstados.filter(est => est.regiao.id === item.id)
                        : [];

                    return (
                        <li key={item.id} className="card-item">
                            <div className="card-info">
                                <span className="item-nome">{item.nome}</span>
                                {item.sigla && <span className="item-sigla">{item.sigla}</span>}
                            </div>
                            
                            {endpoint === 'regioes' && (
                                <div className="lista-mini-estados">
                                    <p className="label-estados">Estados da região (clique para cidades):</p>
                                    {estadosDaRegiao.map(est => (
                                        <button 
                                            key={est.id} 
                                            className="mini-badge-btn"
                                            onClick={() => irParaMunicipios(est.id)}
                                            title={`Ver municípios de ${est.nome}`}
                                        >
                                            <strong>{est.sigla}</strong> - {est.nome}
                                        </button>
                                    ))}
                                </div>
                            )}
                            
                            <span className="item-id">ID: {item.id}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};