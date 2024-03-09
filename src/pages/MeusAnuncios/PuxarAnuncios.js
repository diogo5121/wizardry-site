import React, { useState, useEffect } from 'react';
import axios from 'axios';
import headers from '../../Services/configapi';
import { useNavigate } from 'react-router-dom';
import ipApi from '../../Services/ipApi';
import { Button, ButtonGroup, IconButton, Image, Skeleton, Spinner, Td, Tr } from '@chakra-ui/react';
import { BsChatDots, BsCheck, BsFillTrashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import { GiCancel } from "react-icons/gi";

function PuxarAnuncios(uid, currentPage, setTotalpage, setTotalAnuncio, NumeroPorPagina, setEditNav, setEditAnuncio, setPergNav) {
    const [anuncios, setanuncios] = useState([]);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);

    const itemsPerPage = NumeroPorPagina;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const OrganizarAnuncios = anuncios.sort((a, b) => b.id - a.id)

    const visibleAnuncios = OrganizarAnuncios.slice(startIndex, endIndex, setTotalpage);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const dataa = {
                tabela: 'anuncios',
                item: 'uid',
                valoritem: uid,
            };
            axios.post(`${ipApi}/api/banco/consultaespecifica`, dataa, { headers })
                .then(response => {
                    setanuncios(response.data.message)
                    setLoading(false)

                    const totalPages = Math.ceil(response.data.message.length / NumeroPorPagina);
                    setTotalpage(totalPages);


                })
                .catch(error => {
                    console.log(error)
                    setTotalAnuncio(-1)
                    setLoading(false)
                });

        }

        fetchData();
    }, [uid, currentPage, NumeroPorPagina]);

    function DeletarAnuncio(id, caminho) {
        setLoading(true)

        const dataa = {
            caminho: caminho,
            valoritem: id,
        };
        const caminhoo = {
            caminho: caminho,
        };
        console.log('Excluindo anuncio')

        axios.post(`${ipApi}/api/banco/deletaranuncio`, dataa, { headers })
            .then(response => {
                axios.post(`${ipApi}/api/banco/excluirimagem`, caminhoo, { headers })
                    .then(response => {
                        window.location.reload()
                    })
                    .catch(error => {
                        console.log(error)
                    });
            })
            .catch(error => {
                console.log(error)
            });
    }

    if (loading) {
        return (
            <Tr>
                <Td><Skeleton height='20px' /></Td>
                <Td><Skeleton height='20px' /></Td>
                <Td><Skeleton height='20px' /></Td>
                <Td><Skeleton height='20px' /></Td>
            </Tr>
        )
    } else {
        if (anuncios[0] == undefined) {

        } else {
            return (

                <>
                    {visibleAnuncios.map((anuncio) => (
                        <Tr>
                            <Td display={{ base: 'none', md: 'table-cell' }}>{anuncio.id}</Td>
                            <Td display={{ base: 'none', md: 'table-cell' }}>
                                <Image boxSize='60px' src={`${ipApi}/images/${anuncio.imagem}`} />
                            </Td>
                            <Td>{anuncio.titulo}</Td>
                            <Td>{`R$${anuncio.preco}`}</Td>
                            <Td>
                                <ButtonGroup variant="solid" size="sm" spacing={3} display={{ base: 'none', md: 'flex' }}>
                                    {anuncio.status === 'aprovado' && (
                                        <Button
                                            size="sm"
                                            variant="solid"
                                            colorScheme="purple"
                                            bg="green.500" // Cor de fundo para status 'aprovado'
                                            cursor="default" // Remove o cursor pointer
                                        >
                                            <BsCheck size={20} />Aprovado
                                        </Button>
                                    )}

                                    {anuncio.status === 'pendente' && (
                                        <Button
                                            size="sm"
                                            colorScheme="yellow"
                                            bg="yellow.300"
                                            cursor="default" // Remove o cursor pointer
                                        >
                                            Pendente
                                        </Button>
                                    )}

                                    {anuncio.status === 'rejeitado' && (
                                        <Button
                                            size="sm"
                                            variant="solid"
                                            colorScheme="red"
                                            bg="red.300" // Cor de fundo para status 'rejeitado'
                                            cursor="default" // Remove o cursor pointer
                                        >
                                            <GiCancel />Rejeitado
                                        </Button>
                                    )}
                                </ButtonGroup>
                                <ButtonGroup variant="solid" size="sm" display={{ base: 'flex', md: 'none' }}>
                                    {anuncio.status === 'aprovado' && (
                                        <IconButton
                                            colorScheme="green"
                                            icon={<BsCheck size={20} />}
                                            aria-label="Edit"
                                            cursor="default" // Remove o cursor pointer
                                        />
                                    )}

                                    {anuncio.status === 'pendente' && (
                                        <IconButton
                                            colorScheme="orange"
                                            icon={<Spinner />}
                                            aria-label="Edit"
                                            cursor="default" // Remove o cursor pointer
                                        />
                                    )}

                                    {anuncio.status === 'rejeitado' && (
                                        <IconButton
                                            colorScheme="red"
                                            icon={<GiCancel />}
                                            aria-label="Edit"
                                            cursor="default" // Remove o cursor pointer
                                        />
                                    )}
                                </ButtonGroup>
                            </Td>

                            <Td>
                                <ButtonGroup variant="solid" size="sm" flexDirection={{ base: 'column', md: 'row' }}>
                                    {anuncio.status !== 'pendente' &&
                                        <IconButton
                                            colorScheme="green"
                                            m={2}
                                            icon={<AiFillEdit />}
                                            aria-label="Edit"
                                            isDisabled={loading}
                                            onClick={() => { setEditNav(true); setEditAnuncio(anuncio) }}
                                        />
                                    }
                                    <IconButton
                                        colorScheme="red"
                                        m={2}
                                        variant="outline"
                                        icon={<BsFillTrashFill />}
                                        aria-label="Delete"
                                        onClick={() => { DeletarAnuncio(anuncio.id, anuncio.imagem) }}
                                        isDisabled={loading}
                                    />
                                    <IconButton
                                        colorScheme="ping"
                                        m={2}
                                        variant="outline"
                                        icon={<BsChatDots />}
                                        aria-label="menssage"
                                        onClick={() => { setPergNav(true); setEditAnuncio(anuncio) }}
                                        isDisabled={loading}
                                    />
                                </ButtonGroup>
                            </Td>
                        </Tr>
                    ))}
                </>

            );
        }


    }


};

export default PuxarAnuncios;