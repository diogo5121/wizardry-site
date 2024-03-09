import { Avatar, Box, Button, Divider, Flex, FormControl, FormHelperText, FormLabel, GridItem, Heading, Input, InputGroup, InputLeftElement, Select, SimpleGrid, Spinner, Stack, Text, Textarea, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-router-dom';
import ipApi from '../../Services/ipApi';
import headers from '../../Services/configapi';

function EditarAnuncio(EditAnuncio, setEditNav) {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [Estoque, setEstoque] = useState('');
    const [tempoentrega, setTempoentrega] = useState('');
    const [preco, setPreco] = useState('');
    const [form, setForm] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTitulo(EditAnuncio.titulo)
        setDescricao(EditAnuncio.descricao)
        setEstoque(EditAnuncio.estoque)
        setTempoentrega(EditAnuncio.tempo_entrega)
        setPreco(EditAnuncio.preco)
    }, [EditAnuncio, setEditNav]);

    const sanitizeInput = (inputValue) => {
        // Substitua as aspas simples, duplas, chaves e parênteses por espaços vazios
        return inputValue.replace(/['"{}()´]/g, '');
    };

    const SalvarAnuncio = () => {
        setLoading(true)
        const valorFormatado = parseFloat(preco).toFixed(2);
        const dataa = {
            titulo: sanitizeInput(titulo),
            descricao: sanitizeInput(descricao),
            estoque: sanitizeInput(Estoque),
            tempo_entrega: sanitizeInput(tempoentrega),
            preco: valorFormatado,
            id: EditAnuncio.id,
        };
        
        axios.post(`${ipApi}/api/banco/alteraranuncio`, dataa, { headers })
            .then(response => {
                window.location.reload();
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            });
    }

    const ValidarDadosBotao = () => {
        const TituloValido = titulo == EditAnuncio.titulo
        const descricaoValido = descricao == EditAnuncio.descricao
        const EstoqueValido = Estoque == EditAnuncio.estoque
        const tempoentregaValido = tempoentrega == EditAnuncio.tempo_entrega
        const precoValido = preco == EditAnuncio.preco

        return !(TituloValido && descricaoValido && EstoqueValido && tempoentregaValido && precoValido)
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
                <Text>Editar Anuncio id: {EditAnuncio.id}</Text>
            </Box>
            <FormControl as={GridItem} colSpan={[6, 6, null, 2]} mt={7}>
                <FormLabel
                    htmlFor="city"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: "gray.50",
                    }}
                >
                    Titulo:
                </FormLabel>
                <Input
                    onChange={(e) => setTitulo(e.target.value)}
                    value={titulo}
                    type="text"
                    mt={1}
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                />
            </FormControl>
            <div>
                <FormControl id="email" mt={3}>
                    <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: "gray.50",
                        }}
                    >
                        Descrição da Anuncio:
                    </FormLabel>
                    <Textarea
                        onChange={(e) => setDescricao(e.target.value)}
                        value={descricao}
                        mt={1}
                        rows={3}
                        shadow="sm"
                        focusBorderColor="brand.400"
                        fontSize={{
                            sm: "sm",
                        }}
                    />
                </FormControl>
            </div>
            <FormControl as={GridItem} colSpan={[6, 6, null, 2]} mt={3}>
                <FormLabel
                    htmlFor="city"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: "gray.50",
                    }}
                >
                    Estoque:
                </FormLabel>
                <Input
                    onChange={(e) => setEstoque(e.target.value)}
                    value={Estoque}
                    type="number"
                    mt={1}
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                />
            </FormControl>
            <FormControl as={GridItem} colSpan={[6, 6, null, 2]} mt={3}>
                <FormLabel
                    htmlFor="city"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: "gray.50",
                    }}
                >
                    Tempo de entrega:
                </FormLabel>
                <Input
                    onChange={(e) => setTempoentrega(e.target.value)}
                    value={tempoentrega}
                    type="number"
                    mt={1}
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                />
            </FormControl>
            <FormControl as={GridItem} colSpan={[6, 6, null, 2]} mt={3}>
                <FormLabel
                    htmlFor="city"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: "gray.50",
                    }}
                >
                    Preço:
                </FormLabel>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        color='green.300'
                        fontSize='1.2em'
                    >
                        R$
                    </InputLeftElement>
                    <Input type="number" placeholder='Coloque um preço' value={preco} onChange={(e) => setPreco(e.target.value)} />
                </InputGroup>
            </FormControl>
            <Box display="flex" flexDirection='row' mt={10}>
                <Button
                    m={3}
                    type="submit"
                    colorScheme="red"
                    _focus={{
                        shadow: "",
                    }}
                    fontWeight="md"
                    onClick={() => { setEditNav(false) }}
                >
                    Cancelar
                </Button>
                {ValidarDadosBotao() && (
                    <Button
                        m={3}
                        type="submit"
                        colorScheme="green"
                        _focus={{
                            shadow: "",
                        }}
                        fontWeight="md"
                        onClick={() => { SalvarAnuncio() }}
                        isDisabled={loading}
                    >{loading && (
                        <Spinner/>
                    )}
                        Salvar
                    </Button>
                )}

            </Box>
        </Box>

    );
}

export default EditarAnuncio;