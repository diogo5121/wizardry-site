import { Avatar, Box, Button, Divider, Flex, FormControl, FormHelperText, FormLabel, GridItem, Heading, Input, InputGroup, InputLeftElement, Select, SimpleGrid, Spinner, Stack, Text, Textarea, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ipApi from '../../Services/ipApi';
import headers from '../../Services/configapi';
import { BsBack, BsBoxArrowInUpRight } from 'react-icons/bs';
import { SlActionUndo } from "react-icons/sl";
import { FaMoneyCheck } from 'react-icons/fa';
import { Navigate, useNavigate } from 'react-router-dom';

function InfoAnuncio(VendaInfo, setInfoNav, InfoComprador) {
    const [Hora, setHora] = useState('');
    const [loading, setLoading] = useState(false);
    const [UsernameComprador, setUsernameComprador] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const dataString = VendaInfo.data_criacao;
        const data = new Date(dataString);

        const dia = data.getDate();
        const mes = data.getMonth() + 1; // Adiciona 1, pois os meses começam do zero
        const ano = data.getFullYear();
        const horas = data.getHours();
        const minutos = data.getMinutes();

        // Adiciona zeros à esquerda, se necessário
        const formatoDia = dia < 10 ? `0${dia}` : dia;
        const formatoMes = mes < 10 ? `0${mes}` : mes;
        const formatoHoras = horas < 10 ? `0${horas}` : horas;
        const formatoMinutos = minutos < 10 ? `0${minutos}` : minutos;

        const dataFormatada = `${formatoDia}/${formatoMes}/${ano} ${formatoHoras}:${formatoMinutos}`;
        setHora(dataFormatada)

    }, [VendaInfo, setInfoNav]);

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

            <Box display="flex" flexDirection='row' mt={10}>
                <Button
                    m={5}
                    type="submit"
                    colorScheme="red"
                    _focus={{
                        shadow: "",
                    }}
                    fontWeight="md"
                    onClick={() => { setInfoNav(false) }}
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
                    onClick={() => { navigate(`/anuncio/${VendaInfo.idanuncio}`) }}
                >
                    <BsBoxArrowInUpRight />Ir para o anuncio
                </Button>

            </Box>
        </Box>

    );
}

export default InfoAnuncio;