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
import { Avatar, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import { RiAdvertisementFill } from 'react-icons/ri';
import { FaChevronRight, FaStar } from 'react-icons/fa';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import PuxarPerguntas from './PuxarPerguntas';
import { Helmet } from 'react-helmet-async';
import { BsStar } from 'react-icons/bs';

const Prefil = () => {
    const [Usuario, setUsuario] = useState([]);
    const [Usuarios, setUsuarios] = useState([]);
    const [valorTotal, setValorTotal] = useState([]);
    const [anuncios, setAnuncios] = useState([]);
    const [avaliacoes, setAvaliacoes] = useState([]);
    const navigate = useNavigate();
    const [quantidade, setQuantidade] = useState(1)
    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [compras, setCompras] = useState([]);

    const sanitizeInput = (inputValue) => {
        return inputValue.replace(/['"{}()´]/g, '');
    };

    useEffect(() => {
        setLoading(true)
        const getUsers = async () => {
            const data = {
                tabela: 'users',
                item: 'username',
                valoritem: sanitizeInput(id),
            };

            await axios.post(`${ipApi}/api/banco/consultaespecifica`, data, { headers })
                .then(response => {
                    const user = response.data.message[0]
                    setUsuario(response.data.message[0])

                    const data = {
                        tabela: 'compras',
                    };

                    axios.post(`${ipApi}/api/banco/consultatabela`, data, { headers })
                        .then(response => {

                            setCompras(response.data.message)
                            const data = {
                                tabela: 'anuncios',
                            };

                            axios.post(`${ipApi}/api/banco/consultatabela`, data, { headers })
                                .then(response => {
                                    setAnuncios(response.data.message)
                                    const data = {
                                        tabela: 'avaliacaoes',
                                    };

                                    axios.post(`${ipApi}/api/banco/consultatabela`, data, { headers })
                                        .then(response => {
                                            const SuasAvaliacoes = response.data.message.filter(avali => avali.uidvendedor === user.uid)
                                            const Ultima = SuasAvaliacoes.length
                                            const soma = Math.max(Ultima - 6, 0);
                                            const filtrarAvaliacoes = SuasAvaliacoes.slice(soma, Ultima);
                                            setAvaliacoes(filtrarAvaliacoes)

                                            const data = {
                                                tabela: 'users',

                                            };
                                            axios.post(`${ipApi}/api/banco/consultatabela`, data, { headers })
                                                .then(response => {
                                                    setUsuarios(response.data.message)
                                                    setLoading(false)
                                                })
                                                .catch(error => {
                                                    //navigate('/')
                                                });
                                        })
                                        .catch(error => {
                                            //navigate('/')
                                        });
                                })
                                .catch(error => {
                                    // navigate('/')
                                });
                        })
                        .catch(error => {
                            // navigate('/')
                        });

                })
                .catch(error => {
                    //  navigate('/')
                    // Retorna para (404- Anuncio não encontrado)
                });
        };

        getUsers();
    }, [id]);


    const VendasVendedor = () => {
        const comprasVendedorr = compras?.filter(compra => compra.uidvendedor === Usuario.uid)
        const comprasVendedor = comprasVendedorr?.filter(compra => compra.statusdacompra != 'pending')


        return comprasVendedor.length;
    }
    const DadosAvaliador = (uid) => {

        const UsuarioFiltrado = Usuarios?.filter(user => user.uid === uid)

        return UsuarioFiltrado[0]?.username
    }





    return (
        <>
            <Helmet>
                <title>Wizardry - {id}</title>
                <meta name='keywords' content={`Perfil, Usuario, Vendas de Itens digitais, Vendas Online`} />
            </Helmet>
            <HeaderGlobal />
            <Box display='flex' flexDirection={{ base: 'column', md: 'row' }} alignItems={{ base: "center", md: 'flex-start' }} justifyContent="center" >
                <Box margin={5} bg="#edf3f8" display="flex" flexDirection="column" alignItems="center" height="100%" width={{ base: "90vw", md: '40vw' }} shadow="lg" borderRadius={20}>
                    <Text fontWeight={700} fontSize={25} mt={5}>Informações do prefil</Text>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <Avatar
                            size={{ base: '2xl', md: 'xl' }}
                            marginTop={10}
                            name="Profile"
                            src={`${ipApi}/images/${Usuario.imagemperfil}`}
                        />
                    )}
                    <Text fontSize="xl" fontWeight="bold" marginTop={4}>
                        Username: {Usuario.username}
                    </Text>
                    <Text fontSize="md" color="gray.500" marginTop={6}>
                        Rank: {Usuario.rank}
                    </Text>
                    <Text fontSize="md" color="gray.500" marginTop={6} mb={5}>
                        Vendas na plataforma: {VendasVendedor()}
                    </Text>
                </Box>
                <Box margin={5} bg="#edf3f8" display="flex" flexDirection="column" alignItems="center" height="100%" width={{ base: "90vw", md: '100%' }} shadow="lg" borderRadius={20}>
                    <Text fontWeight={700} fontSize={25} mt={5}>Avaliações do prefil:</Text>
                    <SimpleGrid columns={{ base: 2, md: 3 }} spacing={7} p={5}>
                        {avaliacoes.map(avali => (
                            <Box border="1px" borderColor="gray.300" p={4} borderRadius="md" display='flex' flexDirection='column' w='100%' maxW={250}>
                                <Box display='flex' flexDirection='row'>
                                    <Text ml={5} mb={3} fontSize={15} fontWeight={700}>{DadosAvaliador(avali.uidavaliador)}</Text>
                                </Box>
                                <Text ml={1} mb={2} whiteSpace="pre-line" color='gray.600'>{avali.texto}</Text>
                                <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
                                    {parseFloat(avali.valor) === 1 && (
                                        <>
                                            <FaStar size={20} cursor={'pointer'} color='yellow' />
                                            <BsStar size={20} cursor={'pointer'} />
                                            <BsStar size={20} cursor={'pointer'} />
                                            <BsStar size={20} cursor={'pointer'} />
                                            <BsStar size={20} cursor={'pointer'} />
                                        </>
                                    )}
                                    {parseFloat(avali.valor) === 2 && (
                                        <>
                                            <FaStar size={20} cursor={'pointer'} color='yellow' />
                                            <FaStar size={20} cursor={'pointer'} color='yellow' />
                                            <BsStar size={20} cursor={'pointer'} />
                                            <BsStar size={20} cursor={'pointer'} />
                                            <BsStar size={20} cursor={'pointer'} />
                                        </>
                                    )}
                                    {parseFloat(avali.valor) === 3 && (
                                        <>
                                            <FaStar size={20} cursor={'pointer'} color='yellow' />
                                            <FaStar size={20} cursor={'pointer'} color='yellow' />
                                            <FaStar size={20} cursor={'pointer'} color='yellow' />
                                            <BsStar size={20} cursor={'pointer'} />
                                            <BsStar size={20} cursor={'pointer'} />
                                        </>
                                    )}
                                    {parseFloat(avali.valor) === 4 && (
                                        <>
                                            <FaStar size={20} cursor={'pointer'} color='yellow' />
                                            <FaStar size={20} cursor={'pointer'} color='yellow' />
                                            <FaStar size={20} cursor={'pointer'} color='yellow' />
                                            <FaStar size={20} cursor={'pointer'} color='yellow' />
                                            <BsStar size={20} cursor={'pointer'} />
                                        </>
                                    )}
                                    {parseFloat(avali.valor) === 5 && (
                                        <>
                                            <FaStar size={20} cursor={'pointer'} color='yellow' />
                                            <FaStar size={20} cursor={'pointer'} color='yellow' />
                                            <FaStar size={20} cursor={'pointer'} color='yellow' />
                                            <FaStar size={20} cursor={'pointer'} color='yellow' />
                                            <FaStar size={20} cursor={'pointer'} color='yellow' />
                                        </>
                                    )}
                                    <Text ml={2} fontSize={20} fontWeight={600}>{parseFloat(avali.valor)}.0</Text>
                                </Box>
                            </Box>
                        ))}
                    </SimpleGrid>
                </Box>
            </Box>
            <Box display='flex' flexDirection={{ base: 'column', md: 'row' }} alignItems={{ base: "center", md: 'flex-start' }} justifyContent="center" >
            </Box>
            <Footer />
        </>
    );
};

export default Prefil;
