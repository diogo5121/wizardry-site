import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import headers from '../../Services/configapi'
import styled from 'styled-components'
import Footer from '../styles/footer';
import HeaderGlobal from '../styles/headerGlobal';
import profileDefaut from '../../images/users/profile.png'
import warframeProductImg from '../../images/warframeproduct.png'
import { FaPencilAlt } from "react-icons/fa";
import PuxarAnuncios from './PuxarAnuncios';
import ipApi from '../../Services/ipApi';
import { AiFillEdit, AiOutlineShoppingCart } from 'react-icons/ai';
import { Avatar, Box, Button, CloseButton, Flex, Select, Spinner, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, VStack, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { BiCart } from 'react-icons/bi';
import PuxarQuantRestAnuncio from './PuxarResAnuncio';
import Pagination from './Pagination';
import EditarAnuncio from './EditarAnuncio';
import Anunciar from '../Anunciar';
import { RiAdvertisementFill } from 'react-icons/ri';
import Perguntas from './Perguntas';





const MeusAnuncios = () => {
    const [username, setusername] = useState([])
    const [rank, setrank] = useState([])
    const [nomeCompleto, setNomeCompleto] = useState([])
    const [valor, setValor] = useState([])
    const [user, setUser] = useState([])
    const [numero, setnumero] = useState([])
    const [profileimage, setprofileimage] = useState([])
    const navigate = useNavigate()
    const uid = localStorage.getItem('uid')
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalpage] = useState(1);
    const [TotalAnuncio, setTotalAnuncio] = useState(1);
    const [NumeroPorPagina, setNumeroPorPagina] = useState(5);
    const [EditNav, setEditNav] = useState(false)
    const [CadastroNav, setCadastroNav] = useState(false)
    const [PergNav, setPergNav] = useState(false)
    const [EditAnuncio, setEditAnuncio] = useState(false)
    const [loading, setLoading] = useState(false)

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Lógica adicional para buscar dados da nova página, se necessário
    };

    useEffect(() => {
        setLoading(true)
        const getUsers = async () => {
            const data = {
                tabela: 'users',
                item: 'email',
                valoritem: localStorage.getItem('email'),
            };
            axios.post(`${ipApi}/api/banco/consultaespecifica`, data, { headers })
                .then(response => {
                    if (response.sucess = true) {
                        setValor(response.data.message[0].valor)
                        setnumero(response.data.message[0].telefone)
                        setusername(response.data.message[0].username)
                        setNomeCompleto(response.data.message[0].name)
                        setrank(response.data.message[0].rank)
                        setUser(response.data.message[0])
                        setprofileimage(response.data.message[0].ProfileImage)
                        setLoading(false)
                    } else {
                    }
                })
                .catch(error => {
                });

        }
        getUsers()
    }, [])

    const handlenumeroporpagina = (e) => {
        const novonumeroporpagina = e.target.value;
        setNumeroPorPagina(novonumeroporpagina)

    };

    return (
        <>
            <HeaderGlobal />
            {EditNav && (
                <Box
                    pos="fixed"
                    top={0}
                    right={0}
                    bottom={0}
                    left={0}
                    bg="rgba(0, 0, 0, 0.5)" // Cor de fundo semitransparente
                    zIndex={10}
                    onClick={() => { setEditNav(false) }}
                />
            )}
            {CadastroNav && (
                <Box
                    pos="fixed"
                    top={0}
                    right={0}
                    bottom={0}
                    left={0}
                    bg="rgba(0, 0, 0, 0.5)" // Cor de fundo semitransparente
                    zIndex={10}
                    onClick={() => { setCadastroNav(false) }}
                />
            )}
            {PergNav && (
                <Box
                    pos="fixed"
                    top={0}
                    right={0}
                    bottom={0}
                    left={0}
                    bg="rgba(0, 0, 0, 0.5)" // Cor de fundo semitransparente
                    zIndex={10}
                    onClick={() => { setPergNav(false) }}
                />
            )}
            <VStack
                pos="absolute"
                top={0}
                right={0}
                bottom={0}
                display={PergNav ? "flex" : "none"}
                p={2}
                bg={useColorModeValue("white", "gray.800")}
                spacing={3}
                shadow="sm"
                zIndex={20}
            >
                <Box >
                    <CloseButton
                        aria-label="Close menu"
                        justifySelf="self-start"
                        onClick={() => { setPergNav(false) }}
                    />
                </Box>
                {Perguntas(EditAnuncio, setPergNav, username)}
            </VStack>


            <VStack
                pos="fixed"
                top={0}
                right={0}
                bottom={0}
                display={EditNav ? "flex" : "none"}
                p={2}
                bg={useColorModeValue("white", "gray.800")}
                spacing={3}
                shadow="sm"
                zIndex={20}
            >
                {EditarAnuncio(EditAnuncio, setEditNav)}
            </VStack>
            <VStack
                pos="absolute"
                top={0}
                right={0}
                bottom={0}
                display={CadastroNav ? "flex" : "none"}
                p={2}
                bg={useColorModeValue("white", "gray.800")}
                spacing={3}
                shadow="sm"
                zIndex={20}
            >
                {Anunciar(setCadastroNav)}
            </VStack>
            <Box Box display='flex' bg="#edf3f8" flexDirection='column' justifyContent='center' alignItems='center' m={2} shadow="lg" borderRadius={20}>
                <Box display='flex' bg="#edf3f8" flexDirection={{ base: 'column', md: 'row' }} justifyContent='space-between' borderRadius={20}>
                    <Box alignItems='center' display='flex' flexDirection='row' m={1} marginLeft={{ base: 0, md: 20 }}>
                        <RiAdvertisementFill size={40} />
                        <Text fontWeight={700} fontSize={{ base: 20, md: 30 }} marginLeft={10}>Seus anuncios</Text>
                    </Box>
                </Box>
            </Box>
            <Box display='flex' flexDirection={{ base: 'column', md: 'row' }} alignItems={{ base: "center", md: 'flex-start' }} justifyContent="center" >

                <Box margin={5} bg="#edf3f8" display="flex" flexDirection="column" alignItems="center" height="100%" width={{ base: "90vw", md: '40vw' }} shadow="lg" borderRadius={20}>
                    <Text fontSize={20} color="green" marginTop={{ base: 2, md: 5 }} fontWeight={800}>
                        Sua Conta
                    </Text>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <Avatar
                            size={{ base: '2xl', md: 'xl' }}
                            marginTop={10}
                            name="Profile"
                            src={`${ipApi}/images/${user.imagemperfil}`}
                            onClick={() => { navigate(`/perfil/${user.username}`) }}
                            cursor={'pointer'}
                        />
                    )}
                    <Text fontSize="xl" fontWeight="bold" marginTop={4}>
                        {username}
                    </Text>
                    <Text fontSize="md" color="gray.500" marginTop={1}>
                        Rank: {rank}
                    </Text>
                    <Text fontSize="md" color="gray.500" marginTop={6}>
                        Anúncios restantes:
                    </Text>
                    <Text fontSize="4xl" fontWeight="bold" color="green.500" mt={2}>
                        {PuxarQuantRestAnuncio()}
                    </Text>
                    <Button colorScheme="green" size="sm" m={7} p={5} onClick={() => { navigate("/upar-conta") }}>
                        Upar conta agora
                    </Button>

                </Box>
                <Box m={5} bg="#edf3f8" shadow="lg" width={{ base: "90vw", md: '100%' }} borderRadius={20}>
                    {PuxarQuantRestAnuncio() >= 1 && (
                        <Box display="flex" alignItems="center">
                            <Button colorScheme="green" size="sm" m={2} p={5} onClick={() => { setCadastroNav(true) }}>
                                Cadastrar Anuncio
                            </Button>
                            <Text fontSize="sm" marginLeft={{ base: 3, md: 20 }}>Anúncios por página:</Text>
                            <Stack spacing={3} >
                                <Select variant='filled' value={NumeroPorPagina} size='sm' onChange={(e) => { handlenumeroporpagina(e) }}>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={30}>30</option>
                                </Select>
                            </Stack>
                        </Box>
                    )}

                    <Table variant='simple' colorScheme='teal' size={{ base: 'sm', md: 'md' }} responsive>
                        <Thead>
                            <Tr>
                                <Th display={{ base: 'none', md: 'table-cell' }}>ID</Th>
                                <Th display={{ base: 'none', md: 'table-cell' }}>Imagem</Th>
                                <Th>Titulo</Th>
                                <Th>Preço</Th>
                                <Th>Status</Th>
                                <Th>Ações</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {PuxarAnuncios(uid, currentPage, setTotalpage, setTotalAnuncio, NumeroPorPagina, setEditNav, setEditAnuncio, setPergNav)}
                        </Tbody>
                    </Table>
                    {TotalAnuncio >= 0 && (
                        <Box justifyContent="center" alignItems="center" display="flex">
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                        </Box>
                    )}

                </Box>
            </Box>
            <Footer />
        </>

    );

};

export default MeusAnuncios;
