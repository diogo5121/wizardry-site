import React, { useState, useEffect } from 'react';
import axios from 'axios';
import headers from '../../Services/configapi';
import { Box, Button, ButtonGroup, Card, CardFooter, CardHeader, Flex, Heading, IconButton, Image, Skeleton, Spinner, Td, Text, Tr } from '@chakra-ui/react';
import ipApi from '../../Services/ipApi';
import { BsCheck, BsInfo, BsTrash } from 'react-icons/bs';
import { GiWalkieTalkie } from 'react-icons/gi';
import { FaStar, FaWalking } from 'react-icons/fa';
import { AiFillAlert, AiFillEdit } from 'react-icons/ai';
import { BiChat, BiNote, BiPhone } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { ImagemRank } from '../Utils/PegarImagemRank';
import PuxarAvaliacoes from '../Home/PuxarAvaliacoes';

const PuxarAnunciosRecentes = (id) => {
    const [anunciosss, setAnuncios] = useState([]);
    const uidd = localStorage.getItem('uid')
    const [loading, setLoading] = useState(true);
    const [compras, setCompras] = useState([]);
    const [avaliacaoes, setAvaliacoes] = useState([]);
    
    const navigate = useNavigate()

    const anuncioss = anunciosss.filter(anuncio => parseFloat(anuncio.estoque) > 0)
    const anuncios = anuncioss.filter(anuncio => anuncio.status === 'aprovado')
    const sanitizeInput = (inputValue) => {
        // Substitua as aspas simples, duplas, chaves e parênteses por espaços vazios
        return inputValue.replace(/['"{}()´]/g, '');
    };


    useEffect(() => {
        const fetchData = async () => {
            const dataa = {
                tabela: 'anuncios',
            };
            try {
                const response = await axios.post(`${ipApi}/api/banco/consultatabela`, dataa, { headers });
                const sortedAnuncios = response.data.message.slice(0, 100);

                const anunciosComDadosVendedor = await Promise.all(sortedAnuncios.map(async (anuncio) => {
                    const dadosVendedor = await obterDadosVendedor(anuncio.uid);
                    return { ...anuncio, dadosVendedor };
                }));
                const FiltrarAnunciosCategoria = anunciosComDadosVendedor.filter(anuncio => anuncio.subcategoria === sanitizeInput(id))
                setAnuncios(FiltrarAnunciosCategoria);
                setLoading(false)

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
                return response.data.message[0]; 
            } catch (error) {
                console.log(error);
                return {}; 
            }
        };
        const ObterCompras = () => {

            const dataa = {
                tabela: 'compras',
            };

            axios.post(`${ipApi}/api/banco/consultatabela`, dataa, { headers })
                .then(response => {
                    setCompras(response.data.message)
                    console.log(response.data.message)

                }).catch(error => {
                    console.log(error);

                })

        }
        ObterCompras();

        const ObterAvaliacoes = () => {

            const dataa = {
                tabela: 'avaliacaoes',
            };
    
                axios.post(`${ipApi}/api/banco/consultatabela`, dataa, { headers })
                .then(response => {
                    console.log(response.data.message)
                    setAvaliacoes(response.data.message)
                }).catch(error => {
                    console.log(error);

                })

        }
        ObterAvaliacoes()

        fetchData();
    }, [uidd]);

    const PuxarNumeroVendas = (idAnuncio) => {
        const comprasfiltradas = compras.filter(compra => compra.statusdacompra !== 'pending')
        const comprasFormatada = comprasfiltradas.filter(compra => compra.idanuncio === idAnuncio)
        const comprasNumero = comprasFormatada.length

        return comprasNumero;


    }

    if (loading) {
        return (
            <Skeleton />
        );
    }

    return (
        <>
            {anuncios
                .filter(anuncio => anuncio.status === 'aprovado')
                .map((anuncio) => {
                    return (
                        <Card
                            display='flex'
                            flexDirection='column'
                            alignItems='center'
                            onClick={() => { navigate(`/anuncio/${anuncio.id}`) }}
                            cursor='pointer'
                            position="relative" // Importante para posicionar a imagem de fundo corretamente
                            transition="transform 0.3s ease-in-out" // Adiciona uma transição suave para a propriedade transform
                            _hover={{
                              transform: 'scale(1.05)', // Aumenta o tamanho em 10% quando o mouse estiver sobre o elemento
                            }}
                        >
                            <Image
                                src={`${ipApi}/images/${anuncio.imagem}`}
                                alt={anuncio.titulo}
                                boxSize={{ base: "150px", md: "200px" }} // Define a largura e altura desejadas
                                objectFit="cover" // Controla como a imagem é redimensionada
                            />
                            <CardHeader>
                                <Heading size={{ base: 5, md: 'md' }}> {anuncio.titulo}</Heading>
                            </CardHeader>
                            <CardHeader>
                                <Text color='gray.700' fontSize={{ base: 11, md: 15 }}>Vendedor: {anuncio.dadosVendedor.username}</Text>
                                <Text color='gray.700' marginTop={{ base: 0, md: 1 }} fontSize={{ base: 11, md: 15 }}>
                                    <Flex align="center">
                                        Rank: {anuncio.dadosVendedor.rank} {ImagemRank(anuncio.dadosVendedor.rank, 30)}
                                    </Flex>
                                </Text>
                                <Text color='gray.700' fontSize={{ base: 11, md: 15 }}>Vendas: {PuxarNumeroVendas(anuncio.id)} Un.</Text>
                                <Text color='gray.700' display='inline-block' fontSize={{ base: 11, md: 15 }}>{PuxarAvaliacoes(anuncio.id, avaliacaoes)}</Text>
                                <Box border="1px" borderColor="gray.300" p={1} borderRadius="md">
                                    <Text color='green.600' fontSize={{ base: 20, md: 25 }}>
                                        R$ {anuncio.preco}
                                    </Text>
                                </Box>
                            </CardHeader>
                        </Card>
                    );
                })
            }
        </>
    );
};

export default PuxarAnunciosRecentes;
