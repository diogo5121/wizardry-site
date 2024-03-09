import { Avatar, Box, Button, Divider, Flex, FormControl, FormHelperText, FormLabel, GridItem, Heading, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Select, SimpleGrid, Spinner, Stack, Text, Textarea, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-router-dom';
import ipApi from '../../Services/ipApi';
import headers from '../../Services/configapi';
import { BiSend } from 'react-icons/bi';
import Pagination from './Pagination';

function Perguntas(EditAnuncio, setPergNav, username) {
    const [perguntas, setPerguntas] = useState([])
    const [inputresposta, setinputResposta] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalpage] = useState(1);
    const [atualizar, setAtualizar] = useState(1);
    const [loading, setLoading] = useState(false)

    const itemsPerPage = 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const visibleAnuncios = perguntas.slice(startIndex, endIndex, setTotalpage);


    useEffect(() => {

        const data = {

            tabela: 'perguntas',
            item: 'id_anuncio',
            valoritem: EditAnuncio.id,
        };

        axios.post(`${ipApi}/api/banco/consultaespecifica`, data, { headers })
            .then(response => {
                console.log(response.data.message)
                const pergunta = response.data.message

                const PerguntasSemResposta = pergunta.filter(pergunta => pergunta.idresposta === 0)
                const Respostas = pergunta.filter(pergunta => pergunta.idresposta != 0)
                const perguntasRespondidas = Respostas.map(pergunta => pergunta.idresposta)
                const dadosExcluidos = PerguntasSemResposta.filter(item => !perguntasRespondidas.includes(item.id));
            
                const dadosExcluidosOrganizados = dadosExcluidos.sort((a, b) => b.id - a.id)

                setPerguntas(dadosExcluidosOrganizados)
                setTotalpage(dadosExcluidosOrganizados.length)
            })
            .catch(err => {
                setPerguntas([])
            })

    }, [EditAnuncio, setPergNav, atualizar]);
    

    const Responder = (id) => {
        setLoading(true)
        const InputFormatado = sanitizeInput(inputresposta)
        const data = {

            id_anuncio: EditAnuncio.id,
            mensagem: InputFormatado,
            username_usuario: username,
            tipo: 'resposta',
            idresposta: id,
        };
        
        axios.post(`${ipApi}/api/banco/createperg`, data, { headers })
            .then(response => {
                console.log(response)
                setAtualizar(atualizar + 1)
                setinputResposta('')
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Lógica adicional para buscar dados da nova página, se necessário
    };

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
                <Text>Perguntas aguardando respostas </Text>
            </Box>
            {visibleAnuncios.map((pergunta) => (
                <Box border="1px" borderColor="gray.300" p={4} borderRadius="md" display='flex' flexDirection='column' w='100%' m={5}>
                    <Box display='flex' flexDirection='row'>
                        <Text ml={5} mb={3} fontSize={20} fontWeight={700}>{pergunta.username_usuario}</Text>

                        <Text ml={1} mb={3} whiteSpace="pre-line" color='gray.600'> - {FormatarData(pergunta.data)}</Text>
                    </Box>

                    <Text ml={1} mb={3} whiteSpace="pre-line" color='gray.600'>{pergunta.mensagem}</Text>
                    <InputGroup>
                        <Input onChange={(e) => { setinputResposta(e.target.value) }} value={inputresposta} placeholder='Responda aqui' />
                        <InputRightElement borderRadius={5}>
                            <IconButton
                                onClick={() => {Responder(pergunta.id)}}
                                colorScheme="green"
                                icon={<BiSend size={20} />}
                                aria-label="Edit"
                                isDisabled={sanitizeInput(inputresposta) === ''}
                                isLoading={loading}
                            />

                        </InputRightElement>
                    </InputGroup>

                </Box>
            ))}
            <Box justifyContent="center" alignItems="center" display="flex">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </Box>
        </Box>

    );
}

export default Perguntas;