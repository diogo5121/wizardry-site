import React, { useState, useEffect } from 'react';
import axios from 'axios';
import headers from '../../Services/configapi';
import ipApi from '../../Services/ipApi';

function PuxarTipoProdutos(valor) {
    const [TipoProdutos, setTipoProduto] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (valor == 'semsem') {

            } else {
                try {
                    const dataa = {
                        tabela: 'subcategorias',
                        item: 'valor',
                        valoritem: valor,
                    };
                    axios.post(`${ipApi}/api/banco/consultaespecifica`, dataa, { headers })
                        .then(response => {
                            const data = {
                                tabela: 'tiposproduto',
                                item: 'subcategoriaid',
                                valoritem: response.data.message[0].subcategoriaid,
                            };
                            axios.post(`${ipApi}/api/banco/consultaespecifica`, data, { headers })
                                .then(response => {
                                    setTipoProduto(response.data.message)
                                })
                                .catch(error => {
                                    console.log(error)
                                });
                        })
                        .catch(error => {
                            console.log(error)
                        });

                } catch (error) {
                }

            };
        }

        fetchData();
    }, [valor]);




    return (
        <>
            {TipoProdutos.map((tiposproduto) => (
                <option value={tiposproduto.valor}>
                    {tiposproduto.nometipoproduto}
                </option>
            ))}
        </>

    );
};

export default PuxarTipoProdutos;