import React, { useState, useEffect } from 'react';
import axios from 'axios';
import headers from '../../Services/configapi';
import ipApi from '../../Services/ipApi';

function PuxarsubCategorias(valor) {
    const [subcategorias, setsubCategorias] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (valor == 'semsem') {

            } else {
                try {
                    const dataa = {
                        tabela: 'categorias',
                        item: 'valor',
                        valoritem: valor,
                    };
                    axios.post(`${ipApi}/api/banco/consultaespecifica`, dataa, { headers })
                        .then(response => {
                            const data = {
                                tabela: 'subcategorias',
                                item: 'categoriaid',
                                valoritem: response.data.message[0].categoriaid,
                            };
                            axios.post(`${ipApi}/api/banco/consultaespecifica`, data, { headers })
                                .then(response => {
                                    setsubCategorias(response.data.message)
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
            {subcategorias.map((subcategoria) => (
                <option value={subcategoria.valor}>
                    {subcategoria.nomesubcategoria}
                </option>
            ))}
        </>

    );
};

export default PuxarsubCategorias;