import React, { useState, useEffect } from 'react';
import axios from 'axios';
import headers from '../../Services/configapi';
import { Button, ButtonGroup, IconButton, Skeleton, Spinner, Td, Text, Tr } from '@chakra-ui/react';
import ipApi from '../../Services/ipApi';
import { BsCheck, BsInfo, BsTrash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const PuxarVendas = (currentPage, NumeroPorPagina, setTotalpage, setVendaInfo, setInfoNav, setCompradorInfo, setChatNav, setVendaNav, usuarioInfo) => {
    const [vendas, setVendas] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const itemsPerPage = NumeroPorPagina;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const OrganizarCompras = vendas.sort((a, b) => b.idsolicitacao - a.idsolicitacao)

    const visibleAnuncios = OrganizarCompras.slice(startIndex, endIndex, setTotalpage);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const dataa = {
                    tabela: 'saque',
                    item: 'uid',
                    valoritem: localStorage.getItem('uid'),
                };

                const responseVendas = await axios.post(`${ipApi}/api/banco/consultaespecifica`, dataa, { headers });
                setVendas(responseVendas.data.message);

                const totalPages = Math.ceil(responseVendas.data.message.length / NumeroPorPagina);
                setTotalpage(totalPages);

            } catch (error) {
                console.error('Erro ao buscar vendas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [NumeroPorPagina]);

    if (loading) {
        return (
            <Tr>
                <Td><Skeleton height='20px' /></Td>
                <Td><Skeleton height='20px' /></Td>
                <Td><Skeleton height='20px' /></Td>
                <Td><Skeleton height='20px' /></Td>
            </Tr>
        );
    }

    return (
        <>
            {visibleAnuncios
                .map((venda, index) => {
                    return (
                        <Tr key={index}>
                            <Td>{venda.idsolicitacao}</Td>
                            <Td display={{ base: 'none', md: 'table-cell' }}>Pix - {venda.tipochave}</Td>
                            <Td>R$ {venda.valor}</Td>
                            <Td>
                                <ButtonGroup variant="solid" size="sm" spacing={3} display={{ base: 'none', md: 'table-cell' }}>
                                    {venda.status === 'pendente' && (
                                        <Button
                                            size="sm"
                                            variant="solid"
                                            colorScheme="purple"
                                            bg="orange.500" // Cor de fundo para status 'aprovado'
                                            cursor="default" // Remove o cursor pointer
                                        >
                                            <Spinner size='md' m={2} />Em Andamento
                                        </Button>
                                    )}
                                    {venda.status === 'aprovado' && (
                                        <Button
                                            size="sm"
                                            variant="solid"
                                            colorScheme="purple"
                                            bg="green.500" // Cor de fundo para status 'aprovado'
                                            cursor="default" // Remove o cursor pointer
                                        >
                                            <BsCheck size={20} />Finalizada
                                        </Button>
                                    )}
                                </ButtonGroup>
                                <ButtonGroup variant="solid" size="sm" spacing={3} display={{ base: 'flex', md: 'none' }}>
                                    {venda.status === 'pendente' && (
                                        <Button
                                            size="sm"
                                            variant="solid"
                                            colorScheme="purple"
                                            bg="orange.500" // Cor de fundo para status 'aprovado'
                                            cursor="default" // Remove o cursor pointer
                                        >
                                            <Spinner size='md' m={2} />
                                        </Button>
                                    )}
                                    {venda.status === 'aprovado' && (
                                        <Button
                                            size="sm"
                                            variant="solid"
                                            colorScheme="purple"
                                            bg="green.500" // Cor de fundo para status 'aprovado'
                                            cursor="default" // Remove o cursor pointer
                                        >
                                            <BsCheck size={20} />
                                        </Button>
                                    )}
                                </ButtonGroup>
                            </Td>
                            <Td>
                                {venda.status === 'pendente' && (
                                    <ButtonGroup variant="solid" size="sm" flexDirection={{ base: 'column', md: 'row' }}>
                                        <IconButton
                                            colorScheme="blue"
                                            m={2}
                                            icon={<BsInfo size={20} />}
                                            aria-label="Info"
                                            isDisabled={loading}
                                            onClick={() => { setVendaInfo(venda); setInfoNav(true) }}
                                        />
                                    </ButtonGroup>
                                )}
                                {venda.status === 'aprovado' && (
                                    <ButtonGroup variant="solid" size="sm" flexDirection={{ base: 'column', md: 'row' }}>
                                        <IconButton
                                            colorScheme="blue"
                                            m={2}
                                            icon={<BsInfo size={20} />}
                                            aria-label="Info"
                                            isDisabled={loading}
                                            onClick={() => { setVendaInfo(venda); setInfoNav(true) }}
                                        />
                                    </ButtonGroup>
                                )}
                            </Td>
                        </Tr>
                    );
                })
            }
        </>
    );
};

export default PuxarVendas;
