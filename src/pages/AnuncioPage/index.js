import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom'; // Importe o `useParams` daqui
import axios from 'axios';
import headers from '../../Services/configapi';
import styled from 'styled-components';
import Footer from '../styles/footer';
import HeaderGlobal from '../styles/headerGlobal';
import profileDefaut from '../../images/users/profile.png';
import PuxarEstoque from './PuxarEstoque';
import ipApi from '../../Services/ipApi';
import { Avatar, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import { RiAdvertisementFill } from 'react-icons/ri';
import { FaChevronRight } from 'react-icons/fa';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import PuxarPerguntas from './PuxarPerguntas';
import { Helmet } from 'react-helmet-async';

const AnuncioPage = () => {
    const [anuncio, setanuncio] = useState([]);
    const [dadosVendedor, setDadosVendedor] = useState([]);
    const [valorTotal, setValorTotal] = useState([]);
    const navigate = useNavigate();
    const [quantidade, setQuantidade] = useState(1)
    const { id } = useParams();
    const [SelectEstoque, setSelectEstoque] = useState(1);
    const [loading, setLoading] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [compras, setCompras] = useState([]);
    const sanitizeInput = (inputValue) => {
        return inputValue.replace(/['"{}()´]/g, '');
    };

    useEffect(() => {
        setLoading(true)
        const getUsers = async () => {
            const data = {
                tabela: 'anuncios',
                item: 'id',
                valoritem: sanitizeInput(id),
            };

            await axios.post(`${ipApi}/api/banco/consultaespecifica`, data, { headers })
                .then(response => {
                    if (response.data.message[0].status == "aprovado") {
                        setanuncio(response.data.message[0])
                        setValorTotal(response.data.message[0].preco)

                        const dataa = {
                            tabela: 'users',
                            item: 'uid',
                            valoritem: response.data.message[0].uid,
                        };

                        axios.post(`${ipApi}/api/banco/consultaespecifica`, dataa, { headers }).then(response => {
                            setDadosVendedor(response.data.message[0])
                            const dataa = {
                                tabela: 'Compras',
                            };

                            axios.post(`${ipApi}/api/banco/consultatabela`, dataa, { headers }).then(response => {
                                setCompras(response.data.message)
                                setLoading(false)
                            }).catch(err => {

                            })
                        }).catch(err => {

                        })

                    } else {
                        navigate('/')
                    }
                })
                .catch(error => {
                    navigate('/')
                    // Retorna para (404- Anuncio não encontrado)
                });
        };

        getUsers();
    }, [anuncio.id]);

    const somar = () => {
        const estoque = parseFloat(anuncio.estoque)
        if (estoque === quantidade) {
            setQuantidade(estoque)
        } else {
            setQuantidade(quantidade + 1)
        }

    }
    const diminuir = () => {

        if (quantidade === 1) {
            setQuantidade(1)
        } else {
            setQuantidade(quantidade - 1)
        }

    }

    const VendasVendedor = () => {
        const comprasVendedorr = compras.filter(compra => compra.uidvendedor === dadosVendedor.uid)
        const comprasVendedor = comprasVendedorr.filter(compra => compra.statusdacompra != 'pending')


        return comprasVendedor.length;
    }

    useEffect(() => {
        const valorAnuncio = parseFloat(anuncio.preco)
        const soma = valorAnuncio * quantidade
        const somaformatada = soma.toFixed(2)

        setValorTotal(somaformatada)

    }, [quantidade])


    const GoCheckout = () => {
        setLoading(true)

        if (localStorage.getItem('uid') == anuncio.uid) {
            alert('VOCÊ NÃO PODE COMPRAR SEU PROPRIO PRODUTO TT')
        }
        else if (localStorage.getItem('uid') == undefined) {
            navigate('/login')
        }
        else {

            const data = {
                IdAnuncio: anuncio.id,
                Uid: localStorage.getItem('uid'),
                ValorDaCompra: valorTotal,
                QuantidadeDaCompra: quantidade,
                Titulo: anuncio.titulo,
                UidVendedor: anuncio.uid,
            };


            try {
                axios.post(`${ipApi}/api/banco/criarcompra`, data, { headers })
                    .then(response => {
                        const IdCompra = response.data.newId

                        const dataa = {
                            titulo: anuncio.titulo,
                            valor: anuncio.preco,
                            quantidade: quantidade,
                            codigo: IdCompra,
                        }
                        axios.post(`${ipApi}/api/mp/criarpagamento`, dataa, { headers }).then((response) => {
                            const url = response.data.url

                            const dataaa = {
                                tabela: 'compras',
                                item: 'link',
                                valoritem: url,
                                condicao: 'id',
                                valorcondicao: IdCompra,
                            }

                            axios.post(`${ipApi}/api/banco/update`, dataaa, { headers }).then((response) => {
                                window.location.href = url;

                            }).catch(err => {
                                console.log(err)

                            })


                        })

                    })
                    .catch(error => {
                    });


            } catch (error) {
                console.error('não foi possivel criar pagamento', error);
            }
        }
    };

    function capitalizeFirstLetter(str) {
        if (str && typeof str === 'string') {
            return str.charAt(0).toUpperCase() + str.slice(1);
        } else {
            return '';
        }
    }


    return (
        <>
            <Helmet>
                <title>{anuncio.titulo}</title>
                <meta name='description' content={anuncio.descricao?.substring(0, 100) || 'Default Description'} />
                <meta name='keywords' content={`${anuncio.categoria}, ${anuncio.subcategoria}, ${anuncio.tipo_produto}`} />
            </Helmet>
            <HeaderGlobal />
            <Box>
                <Box display='flex' flexDirection={{ base: 'column', md: 'row' }} alignItems={{ base: "center", md: 'flex-start' }} justifyContent="center" >
                    <Box m={5} bg="#edf3f8" shadow="lg" width={{ base: "90vw", md: '100%' }} borderRadius={20}>
                        <Breadcrumb m={3} spacing='8px' separator={<FaChevronRight color='gray.500' />}>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/categorias/${anuncio.categoria}`}>{capitalizeFirstLetter(anuncio.categoria)}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/subcategorias/${anuncio.subcategoria}`}>{capitalizeFirstLetter(anuncio.subcategoria)}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem isCurrentPage>
                                <BreadcrumbLink href='#'>{capitalizeFirstLetter(anuncio.tipo_produto)}</BreadcrumbLink>
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <Text marginLeft={{ base: 0, md: 10 }} m={3} fontSize={30} fontWeight={800}>{anuncio.titulo}</Text>
                        <Image src={`${ipApi}/images/${anuncio.imagem}`} m={7} height={{ base: 200, md: 400 }} width={{ base: 200, md: 400 }} shadow='lg' borderRadius={20} />
                        <Box border="1px" borderColor="gray.300" p={4} borderRadius="md" m={5}>
                            <Text ml={5} mb={3} fontSize={20} fontWeight={700}>Descrição</Text>
                            <Text whiteSpace="pre-line">
                                {anuncio.descricao}
                            </Text>
                        </Box>
                        <Box border="1px" borderColor="gray.300" p={4} borderRadius="md" m={5} display='flex' flexDirection='column'>
                            <Text ml={5} mb={3} fontSize={20} fontWeight={700}>Prazo de entrega</Text>
                            <Text whiteSpace="pre-line" m={2}>
                                {parseFloat(anuncio.tempo_entrega) > 1
                                    ? `${anuncio.tempo_entrega} Dias úteis.`
                                    : `${anuncio.tempo_entrega} Dia útil.`}
                            </Text>
                        </Box>
                        <Box border="1px" borderColor="gray.300" p={4} borderRadius="md" m={5} display='flex' flexDirection='column'>
                            <Text ml={5} mb={3} fontSize={20} fontWeight={700}>Preço por unidade</Text>
                            <Text whiteSpace="pre-line" m={2} fontSize={30} color='green.500' fontWeight={700}>
                                R$ {anuncio.preco}
                            </Text>
                        </Box>

                        <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
                            {localStorage.getItem('uid') === null ? (
                                <>
                                    <Button colorScheme="green" size='lg' mt={5} p={3} isDisabled={true}>Comprar Agora</Button>
                                    <Text color='gray.700' mb={2}>Faça o login para poder comprar</Text>
                                </>
                            ) : (
                                <>
                                    {parseFloat(anuncio.estoque) > 0 ? (
                                        <>
                                            {localStorage.getItem('uid') == anuncio.uid ? (
                                                <>
                                                    <Button colorScheme="green" size='lg' mt={5} p={3} isDisabled={true}>Comprar Agora</Button>
                                                    <Text color='gray.700' mb={2}>Você não pode comprar seu próprio produto</Text>
                                                </>
                                            ) : (
                                                <>
                                                    <Button onClick={onOpen} colorScheme="green" size='lg' m={5} p={3}>Comprar Agora</Button>
                                                </>
                                            )}


                                        </>
                                    ) : (
                                        <>
                                            <>
                                                <Button colorScheme="green" size='lg' mt={5} p={3} isDisabled={true}>Comprar Agora</Button>
                                                <Text color='gray.700' mb={2}>Anuncio sem estoque para venda</Text>
                                            </>
                                        </>
                                    )}
                                </>
                            )}

                        </Box>



                    </Box>
                    <Box margin={5} bg="#edf3f8" display="flex" flexDirection="column" alignItems="center" height="100%" width={{ base: "90vw", md: '40vw' }} shadow="lg" borderRadius={20}>
                        <Text fontWeight={700} fontSize={25} mt={5}>Vendedor</Text>
                        {loading ? (
                            <Spinner />
                        ) : (
                            <Avatar
                                size={{ base: '2xl', md: 'xl' }}
                                marginTop={10}
                                name="Profile"
                                src={`${ipApi}/images/${dadosVendedor.imagemperfil}`}
                                onClick={() => { navigate(`/perfil/${dadosVendedor.username}`) }}
                                cursor={'pointer'}
                            />
                        )}
                        <Text fontSize="xl" fontWeight="bold" marginTop={4}>
                            Username: {dadosVendedor.username}
                        </Text>
                        <Text fontSize="md" color="gray.500" marginTop={6}>
                            Rank: {dadosVendedor.rank}
                        </Text>
                        <Text fontSize="md" color="gray.500" marginTop={6} mb={5}>
                            Vendas na plataforma: {VendasVendedor()}
                        </Text>
                    </Box>
                </Box>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Finalizar compra</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text mt={2} marginBottom={5}>Anuncio: {anuncio.titulo}</Text>
                            <Box border="1px" borderColor="gray.300" p={4} borderRadius="md" m={1}>
                                <Text ml={5} mb={3} fontSize={15} fontWeight={700}>Selecione uma quantidade</Text>
                                <Box display='flex' flexDirection='row' alignItems='center'>
                                    <IconButton
                                        variant='outline'
                                        colorScheme='teal'
                                        fontSize='20px'
                                        icon={<BiLeftArrow />}
                                        onClick={() => { diminuir() }}
                                    />
                                    <Text m={5}>{quantidade}</Text>
                                    <IconButton
                                        variant='outline'
                                        colorScheme='teal'
                                        fontSize='20px'
                                        icon={<BiRightArrow />}
                                        onClick={() => { somar() }}

                                    />
                                </Box>
                                <Text>Estoque total do Anuncio: {anuncio.estoque} Un.</Text>
                            </Box>
                            <Box border="1px" borderColor="gray.300" p={4} borderRadius="md" m={1} display='flex' flexDirection='column'>
                                <Text ml={5} mb={3} fontSize={20} fontWeight={700}>Valor total da compra:</Text>
                                <Text whiteSpace="pre-line" m={2} fontSize={30} color='green.500' fontWeight={700}>
                                    R$ {valorTotal}
                                </Text>
                            </Box>
                        </ModalBody>

                        <ModalFooter>
                            <Button variant='ghost' onClick={onClose}>Voltar</Button>
                            <Button colorScheme='blue' mr={3} onClick={() => { GoCheckout() }} loadingText='Carregando...' isLoading={loading}>
                                Continuar para o checkout
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
            <Box m={5} display='flex'>
                <Box bg="#edf3f8" shadow="lg" width='100%' borderRadius={20} display='flex' alignItems='center' justifyContent='center' flexDirection='column' p={5}>
                    <Text fontWeight={700} fontSize={30} m={5}>Perguntas</Text>

                    {PuxarPerguntas(id, dadosVendedor)}


                </Box>
                <Box margin={5} bg="#edf3f8" display={{ base: "none", md: "flex" }} flexDirection="column" alignItems="center" height="0vh" width={{ base: "90vw", md: '40vw' }} shadow="lg" borderRadius={20}>


                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default AnuncioPage;
