import React, { useState, useEffect } from 'react';
import axios from 'axios';
import headers from '../../Services/configapi';
import { Box, Card, CardHeader, Flex, Heading, Image, Skeleton, Text } from '@chakra-ui/react';
import ipApi from '../../Services/ipApi';
import { useNavigate } from 'react-router-dom';
import { ImagemRank } from '../Utils/PegarImagemRank';

const PuxarVendas = (id) => {
    const [anunciossss, setAnuncios] = useState([]);
    const uidd = localStorage.getItem('uid')
    const [loading, setLoading] = useState(true);
    const [compras, setCompras] = useState([]);
    const navigate = useNavigate()

    const termoMinusculoo = id.toLowerCase();

    const anunciosss = anunciossss.filter(anuncio => parseFloat(anuncio.estoque) > 0)
    const anuncioss = anunciosss.filter(anuncio => anuncio.status === 'aprovado')

    const anuncios = anuncioss.filter(item => {
        const termoMinusculo = termoMinusculoo.replace(/['"{}()´]/g, '')
        const descricaoIncluiTermo = item.descricao.toLowerCase().includes(termoMinusculo);
        const tituloIncluiTermo = item.titulo.toLowerCase().includes(termoMinusculo);
        const categoriaIncluiTermo = item.categoria.toLowerCase().includes(termoMinusculo);
        const subcategoriaIncluiTermo = item.subcategoria.toLowerCase().includes(termoMinusculo);
        const tipoProdutoIncluiTermo = item.tipo_produto.toLowerCase().includes(termoMinusculo);

        return descricaoIncluiTermo || tituloIncluiTermo || categoriaIncluiTermo || subcategoriaIncluiTermo || tipoProdutoIncluiTermo;
    });


    const AnunciosSemRank = anuncios.filter(anuncio => anuncio.dadosVendedor.rank === "Sem Rank");
    const AnunciosBronze = anuncios.filter(anuncio => anuncio.dadosVendedor.rank === "Bronze");
    const AnunciosPrata = anuncios.filter(anuncio => anuncio.dadosVendedor.rank === "Prata");
    const AnunciosOuro = anuncios.filter(anuncio => anuncio.dadosVendedor.rank === "Ouro");
    const AnunciosDiamante = anuncios.filter(anuncio => anuncio.dadosVendedor.rank === "Diamante");
    const AnunciosMestre = anuncios.filter(anuncio => anuncio.dadosVendedor.rank === "Mestre");
    const AnunciosPremium = anuncios.filter(anuncio => anuncio.dadosVendedor.rank === "Premium");

    // Função para embaralhar elementos de um array
    const shuffleArray = (array) => {
        let shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const AnunciosAleatoriosSemRank = shuffleArray(AnunciosSemRank).slice(0, 1);
    const AnunciosAleatoriosBronze = shuffleArray(AnunciosBronze).slice(0, 2);
    const AnunciosAleatoriosPrata = shuffleArray(AnunciosPrata).slice(0, 3);
    const AnunciosAleatoriosOuro = shuffleArray(AnunciosOuro).slice(0, 4);
    const AnunciosAleatoriosDiamante = shuffleArray(AnunciosDiamante).slice(0, 5);
    const AnunciosAleatoriosMestre = shuffleArray(AnunciosMestre).slice(0, 7);
    const AnunciosAleatoriosPremium = shuffleArray(AnunciosPremium).slice(0, 8);

    const TodosJuntosAnuncios = AnunciosAleatoriosPremium.concat(AnunciosAleatoriosMestre, AnunciosAleatoriosDiamante, AnunciosAleatoriosOuro, AnunciosAleatoriosPrata, AnunciosAleatoriosBronze, AnunciosAleatoriosSemRank)

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
                return response.data.message[0]; // Supondo que você obtenha um único usuário com base no UID
            } catch (error) {
                console.log(error);
                return {}; // ou outra manipulação de erro
            }
        };

        fetchData();

        ObterCompras();
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
            {TodosJuntosAnuncios
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
                                <Text color='gray.700' fontSize={{ base: 11, md: 15 }}>Username: {anuncio.dadosVendedor.username}</Text>
                                <Text color='gray.700' marginTop={{ base: 0, md: 1 }} fontSize={{ base: 11, md: 15 }}>
                                    <Flex align="center">
                                        Rank: {anuncio.dadosVendedor.rank} {ImagemRank(anuncio.dadosVendedor.rank, 30)}
                                    </Flex>
                                </Text>
                                <Text color='gray.700' fontSize={{ base: 11, md: 15 }}>Vendas: {PuxarNumeroVendas(anuncio.id)} Un.</Text>
                                <Text color='gray.700' display='inline-block' fontSize={{ base: 11, md: 15 }}>Avaliações: 240(4,8)⭐</Text>
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

export default PuxarVendas;
