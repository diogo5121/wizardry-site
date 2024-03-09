import React, { useState, useEffect } from 'react';
import axios from 'axios';
import headers from '../../Services/configapi';
import { DestaqueDescription, DestaqueImage, DestaqueItem, DestaquePreço, DestaqueTitle, DestaquesSection } from './style';
import styled from 'styled-components';
import { FaPencilAlt } from "react-icons/fa";
import PuxarDadosUser from '../../Services/puxarDadosUser';
import ipApi from '../../Services/ipApi';


const EditIcon = styled(FaPencilAlt)`
  margin-right: 8px;
  color: black;
`;

function PuxarAnunciosRecentes() {
    const [anuncios, setAnuncios] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const dataa = {
                tabela: 'anuncios',
            };
            try {
                const response = await axios.post(`${ipApi}/api/banco/consultatabela`, dataa, { headers });
                const sortedAnuncios = response.data.message.sort((a, b) => new Date(b.horario) - new Date(a.horario));
                const recentAnuncios = sortedAnuncios.slice(0, 10);

                // Adiciona dados do vendedor a cada anúncio
                const anunciosComDadosVendedor = await Promise.all(recentAnuncios.map(async (anuncio) => {
                    const dadosVendedor = await obterDadosVendedor(anuncio.uid);
                    return { ...anuncio, dadosVendedor };
                }));

                setAnuncios(anunciosComDadosVendedor);

            } catch (error) {
                console.log(error);
            }
        };

        const obterDadosVendedor = async (uid) => {
            const dataa = {
                tabela: 'users',
                item: 'uid',
                valoritem: uid,
            };

            try {
                const response = await axios.post(`${ipApi}/api/banco/consultaespecifica`, dataa, { headers });
                return response.data.message[0]; // Supondo que você obtenha um único usuário com base no UID
            } catch (error) {
                console.log(error);
                return {}; // ou outra manipulação de erro
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {anuncios.map((anuncio) => (
                <DestaqueItem key={anuncio.id}>
                    <DestaqueImage src={`${ipApi}/images/${anuncio.imagem}`} alt="Imagem de Destaque" />
                    <DestaqueTitle>{anuncio.titulo}</DestaqueTitle>
                    <DestaqueDescription>Vendedor: {anuncio.dadosVendedor.username}</DestaqueDescription>
                    <DestaqueDescription>Rank do vendedor: {anuncio.dadosVendedor.rank}</DestaqueDescription>
                    <DestaqueDescription>Avaliações: 10</DestaqueDescription>
                    <DestaquePreço>
                        <a>Preço: R$ {anuncio.preco}</a>
                    </DestaquePreço>
                </DestaqueItem>
            ))}
        </>
    );
}

export default PuxarAnunciosRecentes;
