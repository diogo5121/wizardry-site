// PuxarEstoque.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import headers from '../../Services/configapi';
import ipApi from '../../Services/ipApi';

function PuxarEstoque({ id }) {
    const [estoque, setEstoque] = useState(1);
    const sanitizeInput = (inputValue) => {
        return inputValue.replace(/['"{}()´]/g, '');
    };

    useEffect(() => {
        const fetchData = async () => {
            const dataa = {
                tabela: 'anuncios',
                item: 'id',
                valoritem: sanitizeInput(id),
            };

            try {
                const response = await axios.post(`${ipApi}/api/banco/consultaespecifica`, dataa, { headers });
                const estoqueData = response.data.message[0].estoque;
                setEstoque(estoqueData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    return estoque;
}

export default PuxarEstoque;
