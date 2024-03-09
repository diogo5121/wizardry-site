import React, { useState, useEffect } from 'react';
import axios from 'axios';
import headers from '../../Services/configapi';
import { Button, ButtonGroup, IconButton, Skeleton, Td, Text, Tr } from '@chakra-ui/react';
import ipApi from '../../Services/ipApi';
import { BsCheck, BsInfo, BsStar, BsTrash } from 'react-icons/bs';
import { GiWalkieTalkie } from 'react-icons/gi';
import { FaWalking } from 'react-icons/fa';
import { AiFillAlert, AiFillEdit } from 'react-icons/ai';
import { BiChat, BiPhone } from 'react-icons/bi';
import { MdOutlinePayments } from 'react-icons/md';

const PuxarCompras = (currentPage, NumeroPorPagina, setTotalpage, setVendaInfo, setInfoNav, setCompradorInfo, setChatNav, setFinaNav, setAvaliacaoNav, atualizar) => {
    const [Compras, setCompras] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [Avaliacao, setAvaliacao] = useState([]);
    const [loading, setLoading] = useState(true);

    const itemsPerPage = NumeroPorPagina;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const OrganizarCompras = Compras.sort((a, b) => b.id - a.id)

    const visibleAnuncios = OrganizarCompras.slice(startIndex, endIndex, setTotalpage);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const dataa = {
                    tabela: 'Compras',
                    item: 'Uid',
                    valoritem: localStorage.getItem('uid'),
                };

                const responseCompras = await axios.post(`${ipApi}/api/banco/consultaespecifica`, dataa, { headers });
                setCompras(responseCompras.data.message);

                const uidVendedores = responseCompras.data.message.map((venda) => venda.uidvendedor);
                const uniqueUidVendedores = [...new Set(uidVendedores)];

                const promisesUsuarios = uniqueUidVendedores.map(async (uidvendedor) => {
                    const responseUsuario = await buscarInformacoesUsuario(uidvendedor);
                    return responseUsuario;
                });

                const usuarios = await Promise.all(promisesUsuarios);
                setUsuarios(usuarios);

                const totalPages = Math.ceil(responseCompras.data.message.length / NumeroPorPagina);
                setTotalpage(totalPages);

            } catch (error) {
                console.error('Erro ao buscar Compras:', error);
                setCompras([])
            } finally {
                setLoading(false);
            }
        };


        const PuxarTodasAvaliacoes = async () => {
            const dataa = {
                tabela: 'avaliacaoes',
            };

            const responseCompras = await axios.post(`${ipApi}/api/banco/consultatabela`, dataa, { headers });
            setAvaliacao(responseCompras.data.message);

        }
        PuxarTodasAvaliacoes();
        fetchData();
    }, [NumeroPorPagina, atualizar]);

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
    const fazerNovoPagamento = (venda) => {
        setLoading(true)

        const dataa = {
            titulo: venda.titulo,
            valor: venda.valordacompra,
            quantidade: venda.quantidadedacompra,
            codigo: venda.id,
        }
        axios.post(`${ipApi}/api/mp/criarpagamento`, dataa, { headers }).then((response) => {
            console.log(response.data)
            const url = response.data.url

            const dataaa = {
                tabela: 'compras',
                item: 'link',
                valoritem: url,
                condicao: 'id',
                valorcondicao: venda.id,
            }

            axios.post(`${ipApi}/api/banco/update`, dataaa, { headers }).then((response) => {
                console.log(response)
                window.location.href = url;
                setLoading(false)

            }).catch(err => {
                console.log(err)

            })


        })
    }
    const DeletarCompra = (idCompra) => {
        const data = {
            valoritem: idCompra,
        };

        axios.post(`${ipApi}/api/banco/deletarcompra`, data, { headers })
            .then(response => {
                window.location.reload()
            })
            .catch(error => {
                console.log(error)
            });
    }
    const PulsingIconButton = (props) => (
        <IconButton
            css={{
                '@keyframes pulse': {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.2)' },
                    '100%': { transform: 'scale(1)' },
                },
                animation: 'pulse 1.5s infinite', // Ajuste a duração conforme necessário
            }}
            {...props}
        />
    );

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
                    const usuarioCorrespondente = usuarios.flat().find((usuario) => usuario.uid === venda.uidvendedor);
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
                                            colorScheme="green"
                                            bg="green.500" // Cor de fundo para status 'aprovado'
                                            cursor="default" // Remove o cursor pointer
                                        >
                                            <AiFillAlert size={10} />Aprovada
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
                                    {venda.statusdacompra === 'pending' && (
                                        <Button
                                            size="sm"
                                            variant="solid"
                                            colorScheme="orange"
                                            bg="orange.500" // Cor de fundo para status 'aprovado'
                                            cursor="default" // Remove o cursor pointer
                                        >
                                            Esperando Pagamento
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
                                        <PulsingIconButton
                                            colorScheme="green"
                                            m={2}
                                            icon={<BiChat />}
                                            aria-label="Chat"
                                            isDisabled={loading}
                                            onClick={() => { setVendaInfo(venda); setChatNav(true); setCompradorInfo(usuarioCorrespondente) }}
                                        />
                                        <IconButton
                                            colorScheme="green"
                                            m={2}
                                            icon={<BsCheck size={20} />}
                                            aria-label="Finalizar"
                                            isDisabled={loading}
                                            onClick={() => { setVendaInfo(venda); setFinaNav(true); setCompradorInfo(usuarioCorrespondente) }}
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
                                            isLoading={loading}
                                        />
                                        {Avaliacao.filter(Avali => Avali.idcompra === venda.id).length === 1 ? (
                                            <></>
                                        ) : (
                                            <>
                                                <IconButton
                                                    onClick={() => { setVendaInfo(venda); setAvaliacaoNav(true); setCompradorInfo(usuarioCorrespondente) }}
                                                    colorScheme="yellow"
                                                    m={2}
                                                    icon={<BsStar size={20} />}
                                                    aria-label="Info"
                                                    isLoading={loading}
                                                />
                                            </>
                                        )}
                                    </ButtonGroup>
                                )}
                                {venda.statusdacompra === 'pending' && (
                                    <>
                                        <ButtonGroup variant="solid" size="sm" flexDirection={{ base: 'column', md: 'row' }}>
                                            <IconButton
                                                onClick={() => { DeletarCompra(venda.id) }}
                                                colorScheme="red"
                                                m={2}
                                                icon={<BsTrash size={20} />}
                                                aria-label="Info"
                                                isDisabled={loading}
                                            />
                                        </ButtonGroup>
                                        <ButtonGroup variant="solid" size="sm" flexDirection={{ base: 'column', md: 'row' }}>
                                            <IconButton
                                                onClick={() => { fazerNovoPagamento(venda); }}
                                                colorScheme="green"
                                                m={2}
                                                icon={<MdOutlinePayments size={20} />}
                                                aria-label="Info"
                                                isLoading={loading}
                                            />
                                        </ButtonGroup>
                                    </>
                                )}
                            </Td>
                        </Tr>
                    );
                })
            }
        </>
    );
};

export default PuxarCompras;
