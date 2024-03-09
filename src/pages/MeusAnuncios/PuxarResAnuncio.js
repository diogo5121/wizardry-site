import React, { useState, useEffect } from 'react';
import axios from 'axios';
import headers from '../../Services/configapi';
import { useNavigate } from 'react-router-dom';
import ipApi from '../../Services/ipApi';
import { Spinner } from '@chakra-ui/react';



function PuxarQuantRestAnuncio() {
    const uid = localStorage.getItem('uid')
    const [quantidadeanuncios, setquantidadeanuncios] = useState([]);
    const [QuantAnuncidoRank, SetQuantAnuncidoRank] = useState([]);
    const [Rank, SetRank] = useState([]);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const dataa = {
                tabela: 'anuncios',
                item: 'uid',
                valoritem: uid,
            };
            axios.post(`${ipApi}/api/banco/consultaespecifica`, dataa, { headers })
                .then(response => {
                    const dados = response.data.message
                    setquantidadeanuncios(dados.length)
                    console.log(dados.length)
                    const dat = {
                        tabela: 'users',
                        item: 'uid',
                        valoritem: uid,
                    };
                    axios.post(`${ipApi}/api/banco/consultaespecifica`, dat, { headers })
                        .then(response => {
                            SetRank(response.data.message[0].rank)
                            const data = {
                                tabela: 'ranks',
                                item: 'rank',
                                valoritem: response.data.message[0].rank,
                            };
                            axios.post(`${ipApi}/api/banco/consultaespecifica`, data, { headers })
                                .then(response => {
                                    console.log(response.data.message[0].quantidade_anuncios)
                                    SetQuantAnuncidoRank(response.data.message[0].quantidade_anuncios)
                                    setLoading(false)
                                })
                                .catch(error => {
                                    console.log(error)
                                    setLoading(false)
                                });
                        })
                        .catch(error => {
                            console.log(error)
                            setLoading(false)
                        });



                })
                .catch(error => {
                    const dat = {
                        tabela: 'users',
                        item: 'uid',
                        valoritem: uid,
                    };
                    axios.post(`${ipApi}/api/banco/consultaespecifica`, dat, { headers })
                        .then(response => {
                            SetRank(response.data.message[0].rank)
                            const data = {
                                tabela: 'ranks',
                                item: 'rank',
                                valoritem: response.data.message[0].rank,
                            };
                            axios.post(`${ipApi}/api/banco/consultaespecifica`, data, { headers })
                                .then(response => {
                                    console.log(response.data.message[0].quantidade_anuncios)
                                    SetQuantAnuncidoRank(response.data.message[0].quantidade_anuncios)
                                    setLoading(false)
                                })
                                .catch(error => {
                                    console.log(error)
                                    setLoading(false)
                                });
                        })
                        .catch(error => {
                            console.log(error)
                            setLoading(false)
                        });
                });

        }
        fetchData();
    }, [uid]);

    if (loading) {
        return (
            <>
                <Spinner />
            </>
        )

    } else {
        return QuantAnuncidoRank - quantidadeanuncios
    }



};

export default PuxarQuantRestAnuncio;