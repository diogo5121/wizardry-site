import React, { useState, useEffect } from 'react';
import axios from 'axios';
import headers from '../../Services/configapi';
import { Box, Button, ButtonGroup, Card, CardFooter, CardHeader, Checkbox, Flex, Heading, IconButton, Image, Input, Select, Skeleton, Spinner, Td, Text, Tr } from '@chakra-ui/react';
import ipApi from '../../Services/ipApi';
import { useNavigate } from 'react-router-dom';
import { ImagemRank } from '../Utils/PegarImagemRank';

const AddCategorias = () => {
    const [loading, setLoading] = useState(false);
    const [atualizar, setAtualizar] = useState(1);
    const [categorias, setcategorias] = useState([]);
    const [subcategorias, setsubcategorias] = useState([]);
    const [tipoprodutos, settipoprodutos] = useState([]);


    const [categoriaSelecionada, setcategoriaSeleciona] = useState(1);
    const [NovaCategoria, setNovaCategoria] = useState('');
    const [NovaCategoriaValue, setNovaCategoriaValue] = useState('');

    const [subcategoriaSelecionada, setsubcategoriaSeleciona] = useState(1);
    const [NovoTipoProduto, setNovoTipoProduto] = useState('');
    const [NovoTipoProdutoValue, setNovoTipoProdutoValue] = useState('');



    useEffect(() => {
        const PuxarCategorias = () => {
            setLoading(true)
            const dataa = {
                tabela: 'categorias'
            };

            axios.post(`${ipApi}/api/banco/consultatabela`, dataa, { headers })
                .then(response => {
                    console.log(response.data.message)
                    setcategorias(response.data.message)
                    setLoading(false)

                }).catch(error => {
                    console.log(error);
                })
        }
        PuxarCategorias()
        const PuxarSubCategorias = () => {
            setLoading(true)
            const dataa = {
                tabela: 'subcategorias'
            };

            axios.post(`${ipApi}/api/banco/consultatabela`, dataa, { headers })
                .then(response => {
                    console.log(response.data.message)
                    setsubcategorias(response.data.message)
                    setLoading(false)

                }).catch(error => {
                    console.log(error);
                })
        }
        PuxarSubCategorias()

    }, [atualizar]);

    const sanitizeInput = (inputValue) => {
        const inputLow = inputValue.toLowerCase();
        return inputLow.replace(/['"{}()´ ]/g, '');
    };
    const AddSubCategoria = () => {
        setLoading(true)
        const subcategoriaid = subcategorias.length + 1
        const data = {
            subcategoriaid: subcategoriaid,
            nomesubcategoria: NovaCategoria,
            categoriaid: categoriaSelecionada,
            valor: NovaCategoriaValue,
        };

        axios.post(`${ipApi}/api/banco/criarsubcategoria`, data, { headers })
            .then(response => {
                console.log(response.data.message)
                setNovaCategoria('')
                setNovaCategoriaValue('')
                setAtualizar(atualizar + 1)
                setLoading(false)
            }).catch(error => {
                console.log(error);
            })
    };
    const AddTiposProduto = () => {
        setLoading(true)
        console.log(subcategoriaSelecionada)
        console.log(NovoTipoProduto)
        console.log(NovoTipoProdutoValue)
        const data = {
            nometipoproduto: NovoTipoProduto,
            subcategoriaid: subcategoriaSelecionada,
            valor: NovoTipoProdutoValue,
        };

        axios.post(`${ipApi}/api/banco/criartiposproduto`, data, { headers })
            .then(response => {
                setNovoTipoProduto('')
                setNovoTipoProdutoValue('')
                setAtualizar(atualizar + 1)
                setLoading(false)
            }).catch(error => {
                console.log(error);
            })
    };

    if (loading) {
        return (<><Spinner /></>)
    }

    return (
        <>
            <Box minH={670} bgColor='white' display='flex' p={5} flexDirection={'column'}>
                <Text mt={7}>Adicionar subcategoria:</Text>

                <Box display='flex'>
                    <Select onChange={(e) => { setcategoriaSeleciona(parseFloat(e.target.value)); }}>
                        {categorias.map(categoria => (
                            <option value={categoria.categoriaid}>{categoria.nomecategoria}</option>
                        ))}
                    </Select>
                    <Input value={NovaCategoria} onChange={(e) => { setNovaCategoria(e.target.value); setNovaCategoriaValue(sanitizeInput(e.target.value)) }} />
                    <Button colorScheme='green' onClick={() => {AddSubCategoria()}} isDisabled={NovaCategoria === ''}>Add</Button>
                </Box>
                <Text mt={7}>Adicionar tipoproduto:</Text>
                <Box display='flex'>
                    <Select onChange={(e) => { setsubcategoriaSeleciona(parseFloat(e.target.value)); console.log(parseFloat(e.target.value)) }}>
                        {subcategorias
                            .filter(subcategoria => subcategoria.categoriaid === categoriaSelecionada)
                            .map(subcategoria => (
                                <option value={subcategoria.subcategoriaid}>{subcategoria.nomesubcategoria}</option>
                            ))}
                    </Select>
                    <Input valor={NovoTipoProduto} onChange={(e) => { setNovoTipoProduto(e.target.value); setNovoTipoProdutoValue(sanitizeInput(e.target.value)) }} />
                    <Button colorScheme='green' onClick={() => { AddTiposProduto() }} isDisabled={NovoTipoProduto === ''}>Add Sub</Button>
                </Box>

            </Box>
        </>
    );
};

export default AddCategorias;
