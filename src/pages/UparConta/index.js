import React, { useEffect, useState } from 'react';
import Footer from '../styles/footer';
import HeaderGlobal from '../styles/headerGlobal';
import { Box, Button, Card, CardFooter, CardHeader, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { BsGoogle } from 'react-icons/bs';
import axios from 'axios';
import ipApi from '../../Services/ipApi';
import headers from '../../Services/configapi';
import { FaCheckCircle, FaFacebook } from 'react-icons/fa';
import { ImagemRank } from '../Utils/PegarImagemRank';

const UparConta = () => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState([])
    const [quantidadevendas, SetQuantidadeVendas] = useState(0)
    const [ranks, setRanks] = useState([])
    const [rankAtual, setRankAtual] = useState([])


    useEffect(() => {
        setLoading(true)

        const fetchData = async () => {

            axios.post(`${ipApi}/api/banco/consultatabela`, {
                tabela: 'ranks',
            }, { headers }).then(response => {
                const rankss = response.data.message
                const RanksOrganizado = rankss.sort((a, b) => a.id - b.id)
                const TirarSemRank = RanksOrganizado.filter(rank => rank.id !== 10);
                console.log(TirarSemRank)
                setRanks(TirarSemRank)


                axios.post(`${ipApi}/api/banco/consultaespecifica`, {
                    tabela: 'users',
                    item: 'uid',
                    valoritem: localStorage.getItem('uid'),
                }, { headers }).then(response => {
                    const User = response.data.message[0]
                    setUser(response.data.message[0])
                    const Rankatual = rankss.filter(rank => rank.rank === User.rank)
                    setRankAtual(Rankatual[0])

                    axios.post(`${ipApi}/api/banco/consultaespecifica`, {
                        tabela: 'compras',
                        item: 'uidvendedor',
                        valoritem: localStorage.getItem('uid')
                    }, { headers }).then(response => {
                        const VendasAutoriazadas = response.data.message.filter(vendas => vendas.statusdacompra !== 'pending')
                        const VendasFormatada = parseFloat(VendasAutoriazadas.length)

                        SetQuantidadeVendas(VendasFormatada)
                        setLoading(false)

                    }).catch(err => {
                        console.log(err)
                        SetQuantidadeVendas(0)
                        setLoading(false)
                    })
                }).catch(err => {
                    console.log(err)
                    SetQuantidadeVendas(0)
                    setLoading(false)

                })


            }).catch(err => {
                console.log(err)
                SetQuantidadeVendas(0)
                setLoading(false)

            })

        }
        fetchData();
    }, []);

    const FormalizarPrecos = (numeroOriginal) => {
        const numero = numeroOriginal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return numero
    }
    const ValorDescontado = (ProxRank) => {
        const PrecoProxRank = parseFloat(ProxRank.preco)
        const QuantidadeVendasProxRank = parseFloat(ProxRank.quantidade_vendas)
        const PrecoPorVenda = PrecoProxRank / QuantidadeVendasProxRank


        const Desconto = quantidadevendas * PrecoPorVenda
        const DescontoFormatado = Desconto.toFixed(2)
        const soma = PrecoProxRank - DescontoFormatado
        const somaFormalizada = soma
        return somaFormalizada
    }
    const fazerPagamentoRank = (rank, valor) => {
        setLoading(true)

        const dataa = {
            titulo: `Upar a conta: ${user.username} para o rank: ${rank.rank}`,
            valor: valor,
            uid: user.uid,
            username: user.username,
            rankcod: rank.rank,

        }
        
        axios.post(`${ipApi}/api/mp/criarpagamentorank`, dataa, { headers }).then((response) => {
            console.log(response.data)
            window.location.href = response.data.url

        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <HeaderGlobal />
            <Box display='flex' bg="#edf3f8" flexDirection='column' m={2} shadow="lg" borderRadius={20}>
                <Box display='flex' alignItems='center' justifyContent='center' m={5}>
                    <Text fontSize={20} fontWeight={700}>Ranks Disponíveis:</Text>
                </Box>
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' p={5}>
                    {ranks.map((rank) => {
                        return (
                            <>
                                <Card display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                                    {ImagemRank(rank.rank, 100)}
                                    <CardHeader>
                                        <Heading size='md'>{rank.id !== 1 && (<>Rank</>)} {rank.rank}</Heading>
                                    </CardHeader>
                                    <CardHeader>
                                        <Text color='gray.700' marginTop={1}>
                                            <Flex align="center">
                                                <FaCheckCircle color='green' />Taxa de saque: {FormalizarPrecos(parseFloat(rank.taxa_saque))}
                                            </Flex>
                                        </Text>
                                        <Text color='gray.700' marginTop={1}>
                                            <Flex align="center">
                                                <FaCheckCircle color='green' />Quantidade anuncios: {rank.quantidade_anuncios}
                                            </Flex>
                                        </Text>
                                        <Text color='gray.700' marginTop={1}>
                                            <Flex align="center">
                                                <FaCheckCircle color='green' />Taxa de venda: {rank.taxa_venda} %
                                            </Flex>
                                        </Text>
                                        <Text color='gray.700' marginTop={1}>
                                            <Flex align="center">
                                                <FaCheckCircle color='green' />Visibilidade: {rank.visibilidade}x {rank.id !== 1 && (<>mais</>)}
                                            </Flex>
                                        </Text>
                                        {rank.rank === 'Premium' ? (
                                            <>
                                                <Text color='gray.700' marginTop={1}>
                                                    <Flex align="center">
                                                        <FaCheckCircle color='green' />Google Ads <BsGoogle />
                                                    </Flex>
                                                </Text>
                                                <Text color='gray.700' marginTop={1}>
                                                    <Flex align="center">
                                                        <FaCheckCircle color='green' />Facebook Ads <FaFacebook />
                                                    </Flex>
                                                </Text>
                                            </>
                                        ) : (
                                            <>
                                            
                                            </>
                                        )}
                                        {rank.rank === 'Mestre' || rank.rank === 'Diamante' ? (
                                            <>
                                                <Text color='gray.700' marginTop={1}>
                                                    <Flex align="center">
                                                        <FaCheckCircle color='green' />Facebook Ads <FaFacebook />
                                                    </Flex>
                                                </Text>
                                            </>
                                        ) : (
                                            <>
                                            
                                            </>
                                        )}

                                    </CardHeader>
                                    <CardFooter display='flex' alignItems='center' justifyContent='center'>
                                        <Box w="80%" display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                                            {rank.rank === user.rank ? (
                                                <></>
                                            ) : (
                                                <>{quantidadevendas === 0 ? (
                                                    <>

                                                    </>
                                                ) : (
                                                    <>
                                                        {parseFloat(rank.id) > parseFloat(rankAtual.id) ? (
                                                            <>
                                                                <Text fontSize={20} position="relative">
                                                                    De: {FormalizarPrecos(parseFloat(rank.preco))}
                                                                    <span
                                                                        style={{
                                                                            content: '""',
                                                                            position: 'absolute',
                                                                            left: 0,
                                                                            right: 0,
                                                                            top: '50%',
                                                                            borderTop: '2px solid red',
                                                                        }}
                                                                    />
                                                                </Text>
                                                            </>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </>
                                                )}</>
                                            )}

                                            {rank.rank === user.rank ? (
                                                <Button colorScheme="green" variant="outline" cursor='default'>
                                                    <Text color='green' fontWeight={700} fontSize={20} m={1}>Rank Atual</Text>
                                                </Button>
                                            ) : (
                                                <>
                                                    {parseFloat(rank.id) > parseFloat(rankAtual.id) ? (
                                                        <>
                                                            <Button colorScheme="red" variant="outline" isLoading={loading} onClick={() => { fazerPagamentoRank(rank, ValorDescontado(rank)) }}>
                                                                Upar por:
                                                                <Text color='green' fontWeight={700} fontSize={20} m={1}>{FormalizarPrecos(ValorDescontado(rank))}</Text>
                                                            </Button>
                                                            <Text mt={3} fontSize={10}>*Ou faça mais {parseFloat(rank.quantidade_vendas) - quantidadevendas} vendas para upar gratuitamente</Text>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Button colorScheme="gray" variant="outline" cursor='default'>
                                                                <Text color='gray' fontWeight={500} fontSize={10} m={1}>O seu rank atual é melhor do que esse</Text>
                                                            </Button>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </Box>
                                    </CardFooter>
                                </Card>
                            </>
                        )
                    })}
                </SimpleGrid>
            </Box>
            <Footer />
        </>
    );

};

export default UparConta;
