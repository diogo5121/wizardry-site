import React, { useState, useEffect } from 'react';
import axios from 'axios';
import headers from '../../Services/configapi';
import ipApi from '../../Services/ipApi';
import { Box, Button, IconButton, Input, InputGroup, InputLeftAddon, InputRightElement, Text } from '@chakra-ui/react';
import { BiSend } from 'react-icons/bi';

function PuxarPerguntas(id, dadosVendedor) {
    const [perguntas, setPerguntas] = useState([]);
    const [pregunta_input, setPregunta_input] = useState('');
    const [atualizar, setatualizar] = useState(0)
    const [loading, setLoading] = useState(false)

    const OrganizarPerguntas = perguntas.sort((a, b) => b.id - a.id)
    

    useEffect(() => {
        const fetchData = async () => {
            const data = {
                tabela: 'perguntas',
                item: 'id_anuncio',
                valoritem: sanitizeInput(id),
            };

            try {
                const response = await axios.post(`${ipApi}/api/banco/consultaespecifica`, data, { headers });
                setPerguntas(response.data.message);

            } catch (error) {
                console.error('Erro ao buscar perguntas:', error);
            }
        };

        fetchData();
    }, [id, atualizar]);

    const FormatarData = (dataa) => {
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
        return dataFormatada;

    }
    const sanitizeInput = (inputValue) => {
        // Substitua as aspas simples, duplas, chaves e parênteses por espaços vazios
        return inputValue.replace(/['"{}()´]/g, '');
    };
    

    const EnviarPerg = () => {
        setLoading(true)
        const InputFormatado = sanitizeInput(pregunta_input)
        const dataa = {
            tabela: 'users',
            item: 'uid',
            valoritem: localStorage.getItem('uid'),
        };
        axios.post(`${ipApi}/api/banco/consultaespecifica`, dataa, { headers })
            .then(response => {
                const data = {

                    id_anuncio: id,
                    mensagem: InputFormatado,
                    username_usuario: response.data.message[0].username,
                    tipo: 'pergunta',
                    idresposta: 0,
                };
                
                axios.post(`${ipApi}/api/banco/createperg`, data, { headers })
                    .then(response => {
                        console.log(response)
                        setatualizar(atualizar + 1)
                        setPregunta_input('')
                        setLoading(false)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch()



    }


    return (
        <>
            {localStorage.getItem('uid') === null ? (
                <Text color='gray.700'>Você precisa está logado para realizar uma pergunta</Text>
            ) : (
                <>
                {dadosVendedor.uid === localStorage.getItem('uid') ? (
                <Text color='gray.700'>Você não pode fazer uma pergunta a si mesmo</Text>
            ) : (
                <InputGroup>
                    <Input onChange={(e) => { setPregunta_input(e.target.value) }} value={pregunta_input} placeholder='Faça sua pergunta aqui'/>
                    <InputRightElement borderRadius={5}>
                        <IconButton
                            onClick={() => { EnviarPerg() }}
                            colorScheme="green"
                            icon={<BiSend size={20} />}
                            aria-label="Edit"
                            isDisabled={sanitizeInput(pregunta_input) === ''}
                            isLoading={loading}
                        />

                    </InputRightElement>
                </InputGroup>
            )}
                </>
            )}
            

            {OrganizarPerguntas
                .filter((pergunta) => pergunta.tipo === 'pergunta')
                .map((pergunta) => (
                    <Box border="1px" borderColor="gray.300" p={4} borderRadius="md" display='flex' flexDirection='column' w='100%' m={5}>
                        <Box display='flex' flexDirection='row'>
                            <Text ml={5} mb={3} fontSize={20} fontWeight={700}>{pergunta.username_usuario}</Text>

                            <Text ml={1} mb={3} whiteSpace="pre-line" color='gray.600'> - {FormatarData(pergunta.data)}</Text>
                        </Box>

                        <Text ml={1} mb={3} whiteSpace="pre-line" color='gray.600'>{pergunta.mensagem}</Text>
                        {perguntas.filter((ameixa) => ameixa.idresposta === pergunta.id)
                            .map((resposta) => (
                                <Box border="1px" borderColor="gray.300" p={4} borderRadius="md" display='flex' flexDirection='column' w='100%'>
                                    <Box display='flex' flexDirection='row'>
                                        <Text ml={5} mb={3} fontSize={20} fontWeight={700} color='green.700'>{resposta.username_usuario}</Text>
                                        <Text ml={1} mb={3} whiteSpace="pre-line" color='gray.600'> - {FormatarData(resposta.data)}</Text>
                                    </Box>
                                    <Text ml={1} mb={3} whiteSpace="pre-line" color='gray.600'>{resposta.mensagem}</Text>
                                </Box>
                            ))
                        }

                    </Box>
                ))}
        </>
    );
}

export default PuxarPerguntas;
