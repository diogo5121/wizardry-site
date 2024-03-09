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
    const [loading, setLoading] = useState(false);
    const [UsernameComprador, setUsernameComprador] = useState(false);
    const [ValoresAReceber, setValoresAReceber] = useState(0);

    useEffect(() => {
        const dataString = VendaInfo.data_criacao;
        const data = new Date(dataString);
        const valorDesconto = VendaInfo.valordacompra * 0.0699
        const ValorAReceber = VendaInfo.valordacompra - valorDesconto
        const ValorAReceberFormatado = ValorAReceber.toFixed(2);
        setValoresAReceber(ValorAReceberFormatado)

        const dia = data.getDate();
        const mes = data.getMonth() + 1; 
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
                <Text fontWeight={800}>Informações do comprador</Text>
            </Box>
            <FormControl as={GridItem} colSpan={[6, 6, null, 2]} mt={2}>
                <Text >Nome: {InfoComprador.name}</Text>
                <Text >Username: {InfoComprador.username}</Text>
                <Text>Rank: {InfoComprador.rank}</Text>
            </FormControl>

            <Box alignItems="center" flexDirection="column" display="flex" mt={20} >
                <Text fontWeight={800}>Informações da compra</Text>
            </Box>
            <FormControl as={GridItem} colSpan={[6, 6, null, 2]} mt={2}>

                <Text>Id do Anuncio: {VendaInfo.idanuncio}</Text>
                <Text>Data e Hora: {Hora}</Text>
                <Text>Titulo: {VendaInfo.titulo}</Text>
                <Text>Quantidade: {VendaInfo.quantidadedacompra} Un.</Text>
                <Text>Status de Compra: {VendaInfo.statusdacompra}</Text>
                <Text>Taxa: 6,99%</Text>
                <Text>Valor Total a receber: R$ {ValoresAReceber}</Text>
            </FormControl>
            {VendaInfo.statusdacompra === 'finalizado' && (
                <>
                    <Button
                        my={10}
                        size="sm"
                        variant="solid"
                        colorScheme="gree"
                        bg="green.500" // Cor de fundo para status 'aprovado'
                        cursor="default" // Remove o cursor pointer
                        p={5}
                    >
                        <FaMoneyCheck size={20} />DINHEIRO LIBERADO PARA SAQUE
                    </Button>
                </>
            )}
            {VendaInfo.statusdacompra === 'approved' && (
                <>
                    <Button
                        mt={10}
                        size="sm"
                        variant="solid"
                        colorScheme="orange"
                        bg="orange.500"
                        cursor="default"
                        p={5}
                    >
                        <Text>
                            Peça para o cliente finalizar a compra<br />
                            ou espere 14 dias desde a data<br />
                            da compra para liberação do valor.
                        </Text>
                    </Button>
                </>
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