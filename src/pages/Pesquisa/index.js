import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Importe o `useParams` daqui
import Footer from '../styles/footer';
import HeaderGlobal from '../styles/headerGlobal';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardFooter, CardHeader, Flex, Heading, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import { BiPhoneCall } from 'react-icons/bi';
import axios from 'axios';
import ipApi from '../../Services/ipApi';
import headers from '../../Services/configapi'
import { ImagemRank } from '../Utils/PegarImagemRank';
import PuxarVendas from './PuxarAnuncios';
import PuxarAvaliacoes from '../Home/PuxarAvaliacoes';

const Pesquisa = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    const [anunciosss, setAnuncios] = useState([]);
    const [compras, setCompras] = useState([]);
    const [avaliacaoes, setAvaliacoes] = useState([]);


    const termoMinusculooo = id.toLowerCase();

    const anuncioss = anunciosss.filter(anuncio => parseFloat(anuncio.estoque) > 0)
    const anuncios = anuncioss.filter(anuncio => anuncio.status === 'aprovado')
    const sanitizeInput = (inputValue) => {
        return inputValue.replace(/['"{}()´]/g, '');
      };

    const AnunciosFiltrados = anuncios.filter(item => {

          const termoMinusculo = sanitizeInput(termoMinusculooo)

        const descricaoIncluiTermo = item.descricao.toLowerCase().includes(termoMinusculo);
        const tituloIncluiTermo = item.titulo.toLowerCase().includes(termoMinusculo);
        const categoriaIncluiTermo = item.categoria.toLowerCase().includes(termoMinusculo);
        const subcategoriaIncluiTermo = item.subcategoria.toLowerCase().includes(termoMinusculo);
        const tipoProdutoIncluiTermo = item.tipo_produto.toLowerCase().includes(termoMinusculo);

        return descricaoIncluiTermo || tituloIncluiTermo || categoriaIncluiTermo || subcategoriaIncluiTermo || tipoProdutoIncluiTermo;
    });

    const sortedAnuncios = AnunciosFiltrados.sort((a, b) => b.id - a.id);

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
    }, [id]);




    const PuxarNumeroVendas = (idAnuncio) => {
        const comprasfiltradas = compras.filter(compra => compra.statusdacompra !== 'pending')
        const comprasFormatada = comprasfiltradas.filter(compra => compra.idanuncio === idAnuncio)
        const comprasNumero = comprasFormatada.length

        return comprasNumero;


    }






    return (
        <>
            <HeaderGlobal />
            <Box Box display='flex' bg="#edf3f8" flexDirection='column' justifyContent='center' alignItems='center' m={2} shadow="lg" borderRadius={20}>
                <Box display='flex' bg="#edf3f8" flexDirection={{ base: 'column', md: 'row' }} justifyContent='space-between' borderRadius={20}>
                    <Box alignItems='center' display='flex' flexDirection='row' m={1} marginLeft={{ base: 0, md: 20 }}>
                        <Text fontWeight={700} fontSize={25} marginLeft={10}>Pesquisa: {sanitizeInput(id)}</Text>
                    </Box>
                </Box>
            </Box>
            <Box bg="#edf3f8" p={{ base: 1, md: 10 }}>
                <Box display='flex' alignItems='center' flexDirection='column' mb={5}>
                    <Text fontWeight={800} fontSize={20}>Anuncios em destaque:</Text>
                    
                </Box>

                <SimpleGrid spacing={{ base: 2, md: 4 }} templateColumns={{ base: 'repeat(auto-fill, minmax(150px, 2fr))', md: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                {PuxarVendas(id)}
                </SimpleGrid>
                <Box display='flex' alignItems='center' flexDirection='column' mb={5}>
                    <Text fontWeight={800} fontSize={20}>Anuncios:</Text>
                </Box>

                <SimpleGrid spacing={{ base: 2, md: 4 }} templateColumns={{ base: 'repeat(auto-fill, minmax(150px, 2fr))', md: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                    {sortedAnuncios
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
                </SimpleGrid>
            </Box>


            <Footer />
        </>
    );
};

export default Pesquisa;
