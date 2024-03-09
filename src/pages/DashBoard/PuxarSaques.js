import React, { useState, useEffect } from 'react';
import axios from 'axios';
import headers from '../../Services/configapi';
import { Box, Button, ButtonGroup, Card, CardFooter, CardHeader, Checkbox, Flex, Heading, IconButton, Image, Skeleton, Spinner, Td, Text, Tr } from '@chakra-ui/react';
import ipApi from '../../Services/ipApi';
import { useNavigate } from 'react-router-dom';
import { ImagemRank } from '../Utils/PegarImagemRank';

const PuxarSaques = () => {
    const [saquess, setSaquess] = useState([]);
    const uidd = localStorage.getItem('uid')
    const [loading, setLoading] = useState(true);
    const [atualizar, setAtualizar] = useState(1);
    const navigate = useNavigate()

    const saques = saquess.filter(saque => saque.status === 'pendente')

    useEffect(() => {
        const fetchData = async () => {
            const dataa = {
                tabela: 'saque',
            };
            try {
                const response = await axios.post(`${ipApi}/api/banco/consultatabela`, dataa, { headers });
                setSaquess(response.data.message);
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [uidd, atualizar]);

    const FormularData = (dataa) => {
        const dataString = dataa;
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

        return dataFormatada
    };
    

    const AtualizarSaque = (saque, Status) => {
        const dataa = {
            status: Status,
            id: saque.idsolicitacao,
        };

        axios.post(`${ipApi}/api/banco/updatesaque/statussaque`, dataa, { headers })
            .then(response => {
                setAtualizar(1 + atualizar)
                setLoading(false)

            }).catch(error => {
                console.log(error);
            })


    }

    if (loading) {
        return (<><Spinner /></>)
    }

    return (
        <>
            {saques
                .map((saque) => {
                    return (
                        <Card
                            display='flex'
                            flexDirection='column'
                            alignItems='center'
                        >
                            <CardHeader>
                                <Heading size={{ base: 5, md: 'md' }}>SAQUE: {saque.idsolicitacao}</Heading>
                            </CardHeader>
                            <CardHeader>
                                <Text color='gray.700' fontSize={{ base: 11, md: 15 }}>Tipo:  {saque.tipochave}</Text>
                                <Text color='gray.700' fontSize={{ base: 11, md: 15 }}>ChavePix:  {saque.chavepix}</Text>
                                <Text color='gray.700' fontSize={{ base: 11, md: 15 }}>Data: {FormularData(saque.data)} </Text>

                                <Box border="1px" borderColor="gray.300" p={1} borderRadius="md">
                                    <Text color='green.600' fontSize={{ base: 20, md: 25 }}>
                                        R$ {saque.valor}
                                    </Text>
                                </Box>
                            </CardHeader>
                            <CardFooter display={'flex'} flexDirection={'column'}>
                                <Button m={2} colorScheme='green' onClick={() => { AtualizarSaque(saque, 'aprovado') }}>
                                    Aprovar
                                </Button>
                                <Button m={2} colorScheme='red' onClick={() => { AtualizarSaque(saque, 'reprovado') }}>
                                    Reprovar
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })
            }
        </>
    );
};

export default PuxarSaques;
