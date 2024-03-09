import { Avatar, Box, Button, Divider, Flex, FormControl, FormHelperText, FormLabel, GridItem, Heading, Input, InputGroup, InputLeftElement, Select, SimpleGrid, Spinner, Stack, Text, Textarea, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ipApi from '../../Services/ipApi';
import headers from '../../Services/configapi';
import { BsBack, BsBoxArrowInUpRight } from 'react-icons/bs';
import { SlActionUndo } from "react-icons/sl";
import { FaMoneyCheck } from 'react-icons/fa';
import { Navigate, useNavigate } from 'react-router-dom';
import { BiCheck } from 'react-icons/bi';

function FinalizarVenda(VendaInfo, setFinaNav, InfoComprador) {
    const [Hora, setHora] = useState('');
    const [loading, setLoading] = useState(false);
    const [VendaId, setVendaId] = useState(false);
    const navigate = useNavigate();
    const [taxa, setTaxa] = useState(0.0699)

    useEffect(() => {

    }, [VendaInfo, setFinaNav]);

    const FinalizarVenda = (idCompra) => {
        setLoading(true)



        const data = {
            id: idCompra,
        };

        axios.post(`${ipApi}/api/banco/updatePedido/finalizado`, data, { headers })
            .then(response => {

                const dataa = {
                    tabela: 'users',
                    item: 'uid',
                    valoritem: InfoComprador.uid,
                };

                axios.post(`${ipApi}/api/banco/consultaespecifica`, dataa, { headers })
                    .then(response => {
                        const valor = response.data.message[0].valor
                        const valorVenda = VendaInfo.valordacompra

                        const taxaAplicada = parseFloat(valorVenda) * taxa
                        const valorComTaxa = parseFloat(valorVenda) - taxaAplicada
                        const valorComTaxaFomatada = valorComTaxa.toFixed(2)

                        const soma = parseFloat(valor) + parseFloat(valorComTaxaFomatada)

                        const dataaa = {
                            soma: soma,
                            uid: InfoComprador.uid,
                        };
                        
                        axios.post(`${ipApi}/api/banco/updatePedido/saldo`, dataaa, { headers })
                            .then(response => {
                                
                                const dataaaa = {
                                    id: VendaInfo.id,
                                };
                                axios.post(`${ipApi}/api/banco/updatePedido/processamentosaldo`, dataaaa, { headers })
                                    .then(response => {
                                        console.log('deu certo')
                                        window.location.reload()
                                    })
                                    .catch(error => {
                                        console.log('Não foi possivel realizar essa transação')
                                    })
                            })
                            .catch(error => {
                                console.log('Não foi possivel realizar essa transação')
                            })

                    })
                    .catch(error => {
                        console.log('Não foi possivel realizar essa transação')
                    })


            })
            .catch(error => {
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
                <Text>ID DA VENDA: {VendaInfo.id}</Text>
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
                <Text fontWeight={800}>Informações da compra</Text>
            </Box>
            <FormControl as={GridItem} colSpan={[6, 6, null, 2]} mt={2}>

                <Text>Id do Anuncio: {VendaInfo.idanuncio}</Text>
                <Text>Data e Hora: {Hora}</Text>
                <Text>Titulo: {VendaInfo.titulo}</Text>
                <Text>Quantidade: {VendaInfo.quantidadedacompra} Un.</Text>
                <Text>Status de Compra: {VendaInfo.statusdacompra}</Text>
                <Text>Valor Total: R$ {VendaInfo.valordacompra}</Text>
            </FormControl>

            <Box alignItems="center" flexDirection="column" display="flex" m={5} maxWidth={300} padding={5} bgColor='green.300'>
                <Text fontWeight={500}>Ao Finalizar a venda você estará liberando o dinheiro para o vendedor</Text>
            </Box>

            <Box alignItems="center" flexDirection="column" display="flex" mt={7} maxWidth={300}>
                <Text fontWeight={800}>Tem certeza que deseja finalizar a venda?</Text>
            </Box>

            <Box display="flex" flexDirection='row' mt={5}>
                <Button
                    m={5}
                    type="submit"
                    colorScheme="red"
                    _focus={{
                        shadow: "",
                    }}
                    fontWeight="md"
                    onClick={() => { setFinaNav(false) }}
                >
                    <SlActionUndo />Voltar
                </Button>
                <Button
                    m={5}
                    type="submit"
                    colorScheme="blue"
                    _focus={{
                        shadow: "",
                    }}
                    fontWeight="md"
                    onClick={() => { FinalizarVenda(VendaInfo.id) }}
                    isDisabled={loading}
                >
                    <BiCheck />Finalizar Venda
                </Button>

            </Box>
        </Box>

    );
}

export default FinalizarVenda;