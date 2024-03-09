import { Avatar, Box, Button, Divider, Flex, FormControl, FormHelperText, FormLabel, GridItem, Heading, Input, InputGroup, InputLeftElement, Select, SimpleGrid, Spinner, Stack, Text, Textarea, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ipApi from '../../Services/ipApi';
import headers from '../../Services/configapi';
import { BsBack } from 'react-icons/bs';
import { SlActionUndo } from "react-icons/sl";
import { FaMoneyCheck } from 'react-icons/fa';

function InfoAnuncio(VendaInfo, setInfoNav, InfoComprador) {
    const [Hora, setHora] = useState('');

    useEffect(() => {
        const dataString = VendaInfo.data;
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
                <Text>ID DO SAQUE: {VendaInfo.idsolicitacao}</Text>
            </Box>

            <Box alignItems="center" flexDirection="column" display="flex" mt={20} >
                <Text fontWeight={800}>Informações do saque</Text>
            </Box>
            <FormControl as={GridItem} colSpan={[6, 6, null, 2]} mt={2}>

                <Text m={1} mt={4}>Data e Hora: {Hora}</Text>
                <Text m={1}>Tipo do pix: {VendaInfo.tipochave}</Text>
                <Text m={1}>Chave pix: {VendaInfo.chavepix}</Text>
                <Text m={1}>Status: {VendaInfo.status}</Text>
                <Text m={1}>Taxa de Saque: R$ {VendaInfo.taxa}</Text>
                <Text m={1}>Valor Total: R$ {VendaInfo.valor}</Text>
            </FormControl>
            {VendaInfo.status === 'pendente' && (
                <Box bgColor='orange.400' p={5} margin={5} mt={3} borderRadius={20}>
                    <Text fontWeight={600}>
                        Prazo: 1 dia útil
                    </Text>
                </Box>
            )}

            <Box display="flex" flexDirection='row'>
                <Button
                    m={3}
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

            </Box>
        </Box>

    );
}

export default InfoAnuncio;