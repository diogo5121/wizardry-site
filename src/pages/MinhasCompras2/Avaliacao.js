import { Avatar, Box, Button, Divider, Flex, FormControl, FormHelperText, FormLabel, GridItem, Heading, Input, InputGroup, InputLeftElement, Select, SimpleGrid, Spinner, Stack, Text, Textarea, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ipApi from '../../Services/ipApi';
import headers from '../../Services/configapi';
import { BsBack, BsBoxArrowInUpRight, BsStar } from 'react-icons/bs';
import { SlActionUndo } from "react-icons/sl";
import { FaMoneyCheck, FaStar } from 'react-icons/fa';
import { Navigate, useNavigate } from 'react-router-dom';

function Avaliacao(VendaInfo, setAvaliacaoNav, InfoComprador, SetAtualizar, atualizar) {
    const [loading, setLoading] = useState(false);
    const [TextoAvaliacao, setTextoAvaliacao] = useState('');
    const [SelecaoAvalicao, setSelecaoAvalicao] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        setSelecaoAvalicao(0)
    }, [VendaInfo, setAvaliacaoNav]);

    const EnviarAvaliacao = () => {
        setLoading(true)
        console.log('IdAnuncio', VendaInfo.idanuncio)
        console.log('Avaliacao', SelecaoAvalicao)
        console.log('Texto', TextoAvaliacao)

        const dataa = {
            uid: localStorage.getItem('uid'),
            uidvendedor: VendaInfo.uidvendedor,
            texto: TextoAvaliacao,
            idanuncio: VendaInfo.idanuncio,
            valor: SelecaoAvalicao,
            idcompra: VendaInfo.id,
        };

        axios.post(`${ipApi}/api/banco/criaravaliacao`, dataa, { headers })
        .then(response => {
            setAvaliacaoNav(false)
            SetAtualizar(atualizar + 1)
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
            setLoading(false)
        });

    }

    return (
        <Box
            bg="#edf3f8"
            _dark={{
                bg: "#111",
            }}
            p={10}
            borderRadius={20}
            minW={80}

        >
            <Box alignItems="center" flexDirection="column" display="flex" >
                <Text>AVALIE A COMPRA</Text>
            </Box>
            <Box alignItems="center" flexDirection="column" display="flex" mt={5} >
                <Text fontWeight={800}>Informações do Vendedor</Text>
            </Box>
            <FormControl as={GridItem} colSpan={[6, 6, null, 2]} mt={2}>
                <Text >Nome: {InfoComprador.name}</Text>
                <Text >Username: {InfoComprador.username}</Text>
                <Text>Rank: {InfoComprador.rank}</Text>
            </FormControl>

            <Box alignItems="center" flexDirection="column" display="flex" mt={10} >
                <Text fontWeight={800}>Avalie sua compra:</Text>
            </Box>

            <Box m={5} border="1px" borderColor="gray.300" p={1} borderRadius="md">
                <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' m={4}>
                    {SelecaoAvalicao === 0 && (
                        <>
                            <BsStar size={30} cursor={'pointer'} onClick={() => { setSelecaoAvalicao(1) }} />
                            <BsStar size={30} cursor={'pointer'} onClick={() => { setSelecaoAvalicao(2) }} />
                            <BsStar size={30} cursor={'pointer'} onClick={() => { setSelecaoAvalicao(3) }} />
                            <BsStar size={30} cursor={'pointer'} onClick={() => { setSelecaoAvalicao(4) }} />
                            <BsStar size={30} cursor={'pointer'} onClick={() => { setSelecaoAvalicao(5) }} />
                        </>
                    )}
                    {SelecaoAvalicao === 1 && (
                        <>
                            <FaStar size={30} cursor={'pointer'} color='yellow' onClick={() => { setSelecaoAvalicao(1) }} />
                            <BsStar size={30} cursor={'pointer'} onClick={() => { setSelecaoAvalicao(2) }} />
                            <BsStar size={30} cursor={'pointer'} onClick={() => { setSelecaoAvalicao(3) }} />
                            <BsStar size={30} cursor={'pointer'} onClick={() => { setSelecaoAvalicao(4) }} />
                            <BsStar size={30} cursor={'pointer'} onClick={() => { setSelecaoAvalicao(5) }} />
                        </>
                    )}
                    {SelecaoAvalicao === 2 && (
                        <>
                            <FaStar size={30} cursor={'pointer'} color='yellow' onClick={() => { setSelecaoAvalicao(1) }} />
                            <FaStar size={30} cursor={'pointer'} color='yellow' onClick={() => { setSelecaoAvalicao(2) }} />
                            <BsStar size={30} cursor={'pointer'} onClick={() => { setSelecaoAvalicao(3) }} />
                            <BsStar size={30} cursor={'pointer'} onClick={() => { setSelecaoAvalicao(4) }} />
                            <BsStar size={30} cursor={'pointer'} onClick={() => { setSelecaoAvalicao(5) }} />
                        </>
                    )}
                    {SelecaoAvalicao === 3 && (
                        <>
                            <FaStar size={30} cursor={'pointer'} color='yellow' onClick={() => { setSelecaoAvalicao(1) }} />
                            <FaStar size={30} cursor={'pointer'} color='yellow' onClick={() => { setSelecaoAvalicao(2) }} />
                            <FaStar size={30} cursor={'pointer'} color='yellow' onClick={() => { setSelecaoAvalicao(3) }} />
                            <BsStar size={30} cursor={'pointer'} onClick={() => { setSelecaoAvalicao(4) }} />
                            <BsStar size={30} cursor={'pointer'} onClick={() => { setSelecaoAvalicao(5) }} />
                        </>
                    )}
                    {SelecaoAvalicao === 4 && (
                        <>
                            <FaStar size={30} cursor={'pointer'} color='yellow' onClick={() => { setSelecaoAvalicao(1) }} />
                            <FaStar size={30} cursor={'pointer'} color='yellow' onClick={() => { setSelecaoAvalicao(2) }} />
                            <FaStar size={30} cursor={'pointer'} color='yellow' onClick={() => { setSelecaoAvalicao(3) }} />
                            <FaStar size={30} cursor={'pointer'} color='yellow' onClick={() => { setSelecaoAvalicao(4) }} />
                            <BsStar size={30} cursor={'pointer'} onClick={() => { setSelecaoAvalicao(5) }} />
                        </>
                    )}
                    {SelecaoAvalicao === 5 && (
                        <>
                            <FaStar size={30} cursor={'pointer'} color='yellow' onClick={() => { setSelecaoAvalicao(1) }} />
                            <FaStar size={30} cursor={'pointer'} color='yellow' onClick={() => { setSelecaoAvalicao(2) }} />
                            <FaStar size={30} cursor={'pointer'} color='yellow' onClick={() => { setSelecaoAvalicao(3) }} />
                            <FaStar size={30} cursor={'pointer'} color='yellow' onClick={() => { setSelecaoAvalicao(4) }} />
                            <FaStar size={30} cursor={'pointer'} color='yellow' onClick={() => { setSelecaoAvalicao(5) }} />
                        </>
                    )}
                    <Text ml={2} fontSize={20} fontWeight={600}>{SelecaoAvalicao}.0</Text>

                    
                </Box>
                <InputGroup>
                    <Textarea placeholder='Escreve uma descrição' onChange={(e) => {setTextoAvaliacao(e.target.value)}}/>
                </InputGroup>
            </Box>

            <Box display="flex" flexDirection='row' mt={10}>
                <Button
                    m={5}
                    type="submit"
                    colorScheme="red"
                    _focus={{
                        shadow: "",
                    }}
                    fontWeight="md"
                    onClick={() => { setAvaliacaoNav(false) }}
                >
                    <SlActionUndo />Voltar
                </Button>
                <Button
                    m={5}
                    type="submit"
                    colorScheme="green"
                    _focus={{
                        shadow: "",
                    }}
                    fontWeight="md"
                    onClick={() => { EnviarAvaliacao() }}
                    isDisabled={SelecaoAvalicao === 0}
                    isLoading={loading}
                >
                    <BsBoxArrowInUpRight />Enviar
                </Button>

            </Box>
        </Box>

    );
}

export default Avaliacao;