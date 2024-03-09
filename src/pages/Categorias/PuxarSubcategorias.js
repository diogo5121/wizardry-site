import React, { useState, useEffect } from 'react';
import axios from 'axios';
import headers from '../../Services/configapi';
import { Box, Button, ButtonGroup, Card, CardFooter, CardHeader, Heading, IconButton, Image, Skeleton, Spinner, Td, Text, Tr } from '@chakra-ui/react';
import ipApi from '../../Services/ipApi';
import { BsCheck, BsInfo, BsPersonAdd, BsTrash } from 'react-icons/bs';
import { GiGameConsole, GiWalkieTalkie } from 'react-icons/gi';
import { FaStar, FaWalking } from 'react-icons/fa';
import { AiFillAlert, AiFillEdit } from 'react-icons/ai';
import { BiChat, BiNote, BiPhone } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { MdComputer } from 'react-icons/md';

const PuxarSubCategorias = (id) => {
    const [subcategorias, setSubCategorias] = useState([]);
    const uidd = localStorage.getItem('uid')
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()



    const sanitizeInput = (inputValue) => {
        // Substitua as aspas simples, duplas, chaves e parênteses por espaços vazios
        return inputValue.replace(/['"{}()´]/g, '');
    };

    useEffect(() => {
        const fetchData = async () => {
            const dataa = {
                tabela: 'categorias',
                item: 'valor',
                valoritem: sanitizeInput(id),
            };
            try {
                const response = await axios.post(`${ipApi}/api/banco/consultaespecifica`, dataa, { headers });

                const idCategoria = response.data.message[0].categoriaid

                console.log(response)


                const data = {
                    tabela: 'subcategorias',
                    item: 'categoriaid',
                    valoritem: idCategoria,
                };

                const subcategorias = await axios.post(`${ipApi}/api/banco/consultaespecifica`, data, { headers });

                const subcategoriasTudo = subcategorias.data.message
                setSubCategorias(subcategoriasTudo);
                setLoading(false)

            } catch (error) {
                console.log(error);
            }
        };


        fetchData();
    }, [uidd]);

    if (loading) {
        return (
            <Skeleton />
        );
    }

    return (
        <>
            {subcategorias
                .sort((a, b) => a.nomesubcategoria.localeCompare(b.nomesubcategoria))
                .map((subcategoria) => {
                    return (
                        <>
                            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>

                                <Card
                                    bgColor='green.300'
                                    width={{ base: '80px', md: '100px' }}
                                    height={{ base: '80px', md: '100px' }}
                                    m={1}
                                    shadow="lg"
                                    borderRadius={20}
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                    flexDirection='column'
                                    cursor='pointer'
                                    onClick={() => { navigate(`/subcategorias/${subcategoria.valor}`) }}
                                    position="relative"
                                    transition="transform 0.3s ease-in-out"
                                    _hover={{
                                        transform: 'scale(1.1)',
                                    }}
                                >
                                    <Box
                                        position="absolute"
                                        top={0}
                                        left={0}
                                        width="100%"
                                        height="100%"
                                        bgImage={`${ipApi}/images/${subcategoria.valor}.png`}
                                        bgSize="cover"
                                        bgPosition="center"
                                        borderRadius={20}
                                    />
                                    <Box zIndex={1} display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
                                        <Text fontWeight={700} fontSize={{ base: 12, md: 15 }} color='black' textAlign='center' lineHeight='100%'>
                                            {subcategoria.valor === 'outrasredes' && (
                                                <><BsPersonAdd size={40} /></>
                                            )}
                                            {subcategoria.valor === 'outrosjogos' && (
                                                <><GiGameConsole size={40} /></>
                                            )}
                                            {subcategoria.valor === 'jogospc' && (
                                                <><MdComputer size={40} /></>
                                            )}
                                        </Text>
                                    </Box>
                                </Card>
                                <Text fontWeight={800} fontSize={15} color='black' textAlign='center' lineHeight='100%' cursor='pointer' onClick={() => { navigate(`/subcategorias/${subcategoria.valor}`) }}>
                                    {subcategoria.nomesubcategoria}
                                </Text>
                            </Box>
                        </>

                    );
                })
            }
        </>
    );
};

export default PuxarSubCategorias;
