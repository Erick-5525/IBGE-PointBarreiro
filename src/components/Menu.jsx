import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchIbgeData, clearMunicipios } from './Slice'; 
import './menuibge.css'; 

export const MenuIBGE = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { estados, loading } = useSelector((state) => state.ibge);

    const garantirUFs = () => {
        if (estados.length === 0) {
            dispatch(fetchIbgeData('estados'));
        }
    };

    const handleCidadeChange = (idUF) => {
        if (!idUF) return;
        dispatch(clearMunicipios()); 
        navigate(`/consulta/estados/${idUF}/municipios`);
    };

    return (
        <nav className="menu-ibge">
            <div className="menu-links">
                <button className="btn-menu" onClick={() => navigate('/')}>Home</button>
                <button className="btn-menu" onClick={() => navigate('/consulta/estados')}>Estados</button>
                <button className="btn-menu" onClick={() => navigate('/consulta/regioes')}>Regiões</button>
            </div>

            <div className="menu-select-container">
                <label htmlFor="uf-select">Cidades:</label>
                <select 
                    id="uf-select"
                    className="select-uf"
                    onFocus={garantirUFs} 
                    onChange={(e) => handleCidadeChange(e.target.value)}
                    defaultValue=""
                >
                    <option value="" disabled>Selecione a UF</option>
                    {estados.map(uf => (
                        <option key={uf.id} value={uf.id}>{uf.sigla}</option>
                    ))}
                </select>
                {loading && estados.length === 0 && <span className="loader-texto">...</span>}
            </div>
        </nav>
    );
};