import React, { useState, useEffect } from 'react';
import axios from 'axios';
import headers from '../../Services/configapi';
import { Box, Button, ButtonGroup, Card, CardFooter, CardHeader, Checkbox, Flex, Heading, IconButton, Image, Skeleton, Spinner, Td, Text, Tr } from '@chakra-ui/react';
import ipApi from '../../Services/ipApi';
import { useNavigate } from 'react-router-dom';
import { ImagemRank } from '../Utils/PegarImagemRank';
import { AnuncioAprovado, AnuncioAprovadoTitulo } from '../../Services/emails';

const PuxarAnunciosPendentes = () => {
    const [anuncioss, setAnuncios] = useState([]);
    const uidd = localStorage.getItem('uid')
    const [loading, setLoading] = useState(true);
    const [compras, setCompras] = useState([]);
    const [atualizar, setAtualizar] = useState(1);
    const navigate = useNavigate()


    const anuncios = anuncioss.filter(anuncio => anuncio.status === 'pendente')

    useEffect(() => {
        const fetchData = async () => {
            const dataa = {
                tabela: 'anuncios',
            };
            try {
                const response = await axios.post(`${ipApi}/api/banco/consultatabela`, dataa, { headers });
                const sortedAnuncios = response.data.message.sort((a, b) => new Date(b.horario) - new Date(a.horario));

                // Adiciona dados do vendedor a cada anúncio
                const anunciosComDadosVendedor = await Promise.all(sortedAnuncios.map(async (anuncio) => {
                    const dadosVendedor = await obterDadosVendedor(anuncio.uid);
                    return { ...anuncio, dadosVendedor };
                }));
                console.log(anunciosComDadosVendedor)
                setAnuncios(anunciosComDadosVendedor);
                setLoading(false)

            } catch (error) {
                console.log(error);
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

        fetchData();

        ObterCompras();
    }, [uidd, atualizar]);

    const AtualizarAnuncio = (Anuncio, Status) => {
        setLoading(true)

        const dataa = {
            status: Status,
            id: Anuncio.id,
        };

        axios.post(`${ipApi}/api/banco/updateAnuncio/statusanuncio`, dataa, { headers })
            .then(response => {
                const mail = {
                    email: Anuncio.dadosVendedor.email,
                    titulo: `Seu Anuncio foi ${Status} !! - Wizardry`,
                    conteudo: AnuncioAprovado(Anuncio.dadosVendedor.username, Anuncio.id, Anuncio.titulo ,Anuncio.descricao, Anuncio.preco, Anuncio.estoque),
                };

                axios.post(`${ipApi}/api/email`, mail, { headers })
                    .then(response => {
                        setAtualizar(1 + atualizar)
                        setLoading(false)
                    })
                    .catch(error => {
                        console.log('Não foi possivel realizar essa transação')
                    })


            }).catch(error => {
                console.log(error);
            })


    }
    if (loading) {
        return (<><Spinner /></>)
    }

    return (
        <>
            {anuncios
                .map((anuncio) => {
                    return (
                        <Card
                            display='flex'
                            flexDirection='column'
                            alignItems='center'
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
                                <Text color='gray.700' fontSize={{ base: 11, md: 15 }}>Username: {anuncio.dadosVendedor.username}</Text>

                                <Text color='gray.700' marginTop={{ base: 0, md: 1 }} fontSize={{ base: 11, md: 15 }}>
                                    <Flex align="center">
                                        Rank: {anuncio.dadosVendedor.rank} {ImagemRank(anuncio.dadosVendedor.rank, 30)}
                                    </Flex>
                                </Text>
                                <Text color='gray.700' fontSize={{ base: 11, md: 15 }}>Descrição: {anuncio.descricao}</Text>
                                <Box border="1px" borderColor="gray.300" p={1} borderRadius="md">
                                    <Text color='green.600' fontSize={{ base: 20, md: 25 }}>
                                        R$ {anuncio.preco}
                                    </Text>
                                </Box>
                            </CardHeader>
                            <CardFooter display={'flex'} flexDirection={'column'}>
                                <Button m={2} colorScheme='green' onClick={() => { AtualizarAnuncio(anuncio, 'aprovado') }} isLoading={loading}>
                                    Aprovar
                                </Button>
                                <Button m={2} colorScheme='red' onClick={() => { AtualizarAnuncio(anuncio, 'reprovado') }} isLoading={loading}>
                                    Reprovar
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })
            }
        </>
    );
};

export default PuxarAnunciosPendentes;
