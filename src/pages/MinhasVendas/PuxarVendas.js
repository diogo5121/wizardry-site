import React, { useState, useEffect } from 'react';
import axios from 'axios';
import headers from '../../Services/configapi';
import { Button, ButtonGroup, IconButton, Skeleton, Td, Text, Tr } from '@chakra-ui/react';
import ipApi from '../../Services/ipApi';
import { BsCheck, BsInfo, BsTrash } from 'react-icons/bs';
import { GiWalkieTalkie } from 'react-icons/gi';
import { FaWalking } from 'react-icons/fa';
import { AiFillAlert, AiFillEdit } from 'react-icons/ai';
import { BiChat, BiPhone } from 'react-icons/bi';

const PuxarVendas = (currentPage, NumeroPorPagina, setTotalpage, setVendaInfo, setInfoNav, setCompradorInfo, setChatNav, setVendaNav) => {
    const [vendas, setVendas] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    const itemsPerPage = NumeroPorPagina;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    const vendasfiltrada = vendas.filter(venda => venda.statusdacompra === 'approved' || venda.statusdacompra === 'finalizado')
    const OrganizarCompras = vendasfiltrada.sort((a, b) => b.id - a.id)

    const visibleAnuncios = OrganizarCompras.slice(startIndex, endIndex, setTotalpage);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const dataa = {
                    tabela: 'Compras',
                    item: 'UidVendedor',
                    valoritem: localStorage.getItem('uid'),
                };

                const responseVendas = await axios.post(`${ipApi}/api/banco/consultaespecifica`, dataa, { headers });
                setVendas(responseVendas.data.message);

                const uidVendedores = responseVendas.data.message.map((venda) => venda.uid);
                const uniqueUidVendedores = [...new Set(uidVendedores)];

                const promisesUsuarios = uniqueUidVendedores.map(async (uid) => {
                    const responseUsuario = await buscarInformacoesUsuario(uid);
                    return responseUsuario;
                });

                const usuarios = await Promise.all(promisesUsuarios);
                console.log(usuarios)
                setUsuarios(usuarios);

                const Vendas = responseVendas.data.message
                const VendasFiltrada = Vendas.filter(venda => venda.statusdacompra === 'approved' || venda.statusdacompra === 'finalizado')
                const totalPages = Math.ceil(VendasFiltrada.length / NumeroPorPagina);
                setTotalpage(totalPages);
            } catch (error) {
                console.error('Erro ao buscar vendas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [NumeroPorPagina]);

    const buscarInformacoesUsuario = async (uid) => {
        try {
            const dataa = {
                tabela: 'users',
                item: 'uid',
                valoritem: uid,
            };
            const respostaServico = await axios.post(`${ipApi}/api/banco/consultaespecifica`, dataa, { headers });
            return respostaServico.data.message;
        } catch (erro) {
            console.error('Erro ao buscar informações do usuário:', erro);
            return null;
        }
    };

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
                    const usuarioCorrespondente = usuarios.flat().find((usuario) => usuario.uid === venda.uid);
                    return (
                        <Tr key={index}>
                            <Td>{venda.id}</Td>
                            <Td>{venda.titulo}</Td>
                            <Td display={{ base: 'none', md: 'table-cell' }}>
                                {usuarioCorrespondente && (
                                    <Text>{usuarioCorrespondente.username}</Text>
                                )}
                            </Td>
                            <Td>R$ {venda.valordacompra}</Td>
                            <Td display={{ base: 'none', md: 'table-cell' }}>
                                <ButtonGroup variant="solid" size="sm" spacing={3} display={{ base: 'none', md: 'table-cell' }}>
                                    {venda.statusdacompra === 'approved' && (
                                        <Button
                                            size="sm"
                                            variant="solid"
                                            colorScheme="purple"
                                            bg="orange.500" // Cor de fundo para status 'aprovado'
                                            cursor="default" // Remove o cursor pointer
                                        >
                                            <AiFillAlert size={10} />Atenção
                                        </Button>
                                    )}
                                    {venda.statusdacompra === 'finalizado' && (
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
                                    {venda.statusdacompra === 'approved' && (
                                        <Button
                                            size="sm"
                                            variant="solid"
                                            colorScheme="purple"
                                            bg="orange.500" // Cor de fundo para status 'aprovado'
                                            cursor="default" // Remove o cursor pointer
                                        >
                                            <AiFillAlert size={20} />
                                        </Button>
                                    )}
                                    {venda.statusdacompra === 'finalizado' && (
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
                                {venda.statusdacompra === 'approved' && (
                                    <ButtonGroup variant="solid" size="sm" flexDirection={{ base: 'column', md: 'row' }}>
                                        <IconButton
                                            colorScheme="blue"
                                            m={2}
                                            icon={<BsInfo size={20} />}
                                            aria-label="Info"
                                            isDisabled={loading}
                                            onClick={() => { setVendaInfo(venda); setInfoNav(true); setCompradorInfo(usuarioCorrespondente) }}
                                        />
                                        <IconButton
                                            colorScheme="green"
                                            m={2}
                                            icon={<BiChat />}
                                            aria-label="Chat"
                                            isDisabled={loading}
                                            onClick={() => { setVendaInfo(venda); setChatNav(true); setCompradorInfo(usuarioCorrespondente) }}
                                        />
                                        <IconButton
                                            colorScheme="red"
                                            m={2}
                                            icon={<BsTrash />}
                                            aria-label="cancel"
                                            isDisabled={loading}
                                            onClick={() => { window.open(`https://api.whatsapp.com/send?phone=5581996382552&text=Ol%C3%A1,%20estou%20precisando%20excluir%20uma%20venda%20de%20id:%20${venda.id}.`, '_blank') }}
                                        />

                                    </ButtonGroup>
                                )}
                                {venda.statusdacompra === 'finalizado' && (
                                    <ButtonGroup variant="solid" size="sm" flexDirection={{ base: 'column', md: 'row' }}>
                                        <IconButton
                                            onClick={() => { setVendaInfo(venda); setInfoNav(true); setCompradorInfo(usuarioCorrespondente) }}
                                            colorScheme="blue"
                                            m={2}
                                            icon={<BsInfo size={20} />}
                                            aria-label="Info"
                                            isDisabled={loading}
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
