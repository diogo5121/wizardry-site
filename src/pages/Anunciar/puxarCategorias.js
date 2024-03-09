import React, { useState, useEffect } from 'react';
import axios from 'axios';
import headers from '../../Services/configapi';
import ipApi from '../../Services/ipApi';

const PuxarCategorias = () => {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = {
                    tabela: 'categorias',
                };
                const response = await axios.post(`${ipApi}/api/banco/consultatabela`, data, { headers });
                setCategorias(response.data.message);
            } catch (error) {
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {categorias.map((categoria) => (
                <option value={categoria.valor}>
                    {categoria.nomecategoria}
                </option>
            ))}
        </>

    );
};

export default PuxarCategorias;