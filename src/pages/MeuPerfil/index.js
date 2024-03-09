import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarBadge, Box, Button, Spinner, Text, VStack, List, ListItem, ListIcon, HStack, Flex, Input, VisuallyHidden } from '@chakra-ui/react';
import { BsFillPeopleFill, BsArrowRight, BsArrowDown } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
import { BiEdit } from 'react-icons/bi';
import headers from '../../Services/configapi';
import ipApi from '../../Services/ipApi';
import Footer from '../styles/footer';
import HeaderGlobal from '../styles/headerGlobal';
import { ImagemRank } from '../Utils/PegarImagemRank';

const MeuPerfil = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [RankAtual, setRankAtual] = useState([]);
  const [ProxRank, setProxRank] = useState([]);
  const [QauntidaAnuncio, SetQuantidadeAnuncio] = useState(0)
  const [QuantidadeVendas, SetQuantidadeVendas] = useState(0)
  const navigate = useNavigate();
  const inputRef = useRef();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userEmail = localStorage.getItem('email');
        const userResponse = await axios.post(`${ipApi}/api/banco/consultaespecifica`, {
          tabela: 'users',
          item: 'email',
          valoritem: userEmail,
        }, { headers });

        if (userResponse.data.success) {
          setUser(userResponse.data.message[0]);
          const user = userResponse.data.message[0]
          const ranksResponse = await axios.post(`${ipApi}/api/banco/consultatabela`, {
            tabela: 'ranks',
          }, { headers });

          if (ranksResponse.data.success) {
            const ranks = ranksResponse.data.message;
            const userRank = user.rank || 0;
            const rankAtual = ranks.find((rank) => rank.rank === userRank);
            const proxRankId = parseFloat(rankAtual?.id || 0) + 1;
            const proxRank = ranks.find((rank) => rank.id === proxRankId);



            setRankAtual(rankAtual);
            setProxRank(proxRank);

            axios.post(`${ipApi}/api/banco/consultaespecifica`, {
              tabela: 'compras',
              item: 'uidvendedor',
              valoritem: localStorage.getItem('uid')
            }, { headers }).then(response => {
              const VendasFormalizada = response.data.message.filter(venda => venda.statusdacompra !== 'pending')
              const VendasFormatada = parseFloat(VendasFormalizada.length)

              SetQuantidadeVendas(VendasFormatada)
              setLoading(false)

            }).catch(err => {
              console.log(err)
            })

          } else {
            alert('Erro ao buscar ranks');
          }
        } else {
          alert('Email ou senha incorretos');
        }


      } catch (error) {
        console.error('Erro ao realizar requisição:', error);
        alert('Erro ao buscar dados do usuário');
      } finally {
        setLoading(false)
      }
    };

    fetchData();

  }, []);

  function formatarNumeroTelefone(numero) {
    if (!numero) {
      return '';
    }

    const numeroLimpo = numero.replace(/\D/g, '');
    return `+${numeroLimpo.slice(0, 2)} (${numeroLimpo.slice(2, 4)}) ${numeroLimpo.slice(4, 17)} `;
  }

  if (loading) {
    return <Spinner />;
  }

  const ValorDescontado = () => {
    const PrecoProxRank = parseFloat(ProxRank.preco)
    const QuantidadeVendasProxRank = parseFloat(ProxRank.quantidade_vendas)
    const PrecoPorVenda = PrecoProxRank / QuantidadeVendasProxRank


    const Desconto = QuantidadeVendas * PrecoPorVenda
    const DescontoFormatado = Desconto.toFixed(2)
    const soma = PrecoProxRank - DescontoFormatado
    const somaFormalizada = FormalizarPrecos(soma)
    return somaFormalizada
  }

  const FormalizarPrecos = (numeroOriginal) => {
    const numero = numeroOriginal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return numero
  }


  const handleAvatarClick = () => {
    // Clique no Avatar, aciona o clique no input
    inputRef.current.click();
  };

  const handleImageChange = async (event) => {
    try {
      const files = event.target.files;
      if (!files || files.length === 0) {
        return;
      }

      const file = files[0];
      const maxSize = 5 * 1024 * 1024; // 5 MB

      if (file.size > maxSize) {
        alert('A imagem deve ter no máximo 5 MB.');
        return;
      }

      if (user.imagemperfil !== 'profile.png') {
        await axios.post(`${ipApi}/api/banco/excluirimagem`, { caminho: user.imagemperfil }, { headers });
      }

      const data = new FormData();
      data.append('file', file);

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${ipApi}/api/banco/uparimagem`,
        data: data
      };

      const response = await axios.request(config);
      const caminho = response.data.caminho;

      await axios.post(`${ipApi}/api/banco/updateimagemperfil`, {
        imagemperfil: caminho,
        uid: user.uid,
      }, { headers });

      window.location.reload();
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  return (
    <>
      <HeaderGlobal />
      <Box display='flex' bg="#edf3f8" flexDirection='column' justifyContent='center' alignItems='center' m={{ base: 2, md: 5 }} shadow="lg" borderRadius={20}>
        <Box display='flex' bg="#edf3f8" flexDirection={{ base: 'column', md: 'row' }} justifyContent='space-between' borderRadius={20}>
          <Box alignItems='center' display='flex' flexDirection='row' m={1} marginLeft={{ base: 0, md: 20 }}>
            <BsFillPeopleFill size={40} />
            <Text fontWeight={700} fontSize={30} marginLeft={{ base: 4, md: 9 }} >Seu Perfil</Text>
          </Box>
        </Box>
      </Box>
      <Box display='flex' flexDirection={{ base: 'column', md: 'row' }} alignItems={{ base: 'center', md: 'flex-start' }} justifyContent='center'>
        <Box margin={{ base: 2, md: 5 }} bg="#edf3f8" display="flex" flexDirection="column" alignItems="center" height={{ base: '100%', md: '100%' }} width={{ base: '90vw', md: '40vw' }} shadow="lg" borderRadius={20}>
          <Text fontWeight={700} fontSize={20} mt={{ base: 4, md: 10 }} >Perfil</Text>
          <Box textAlign="center">
            <Avatar
              size={{ base: "xl", md: "2xl" }}
              marginTop={{ base: 5, md: 10 }}
              m={{ base: 0, md: 5 }}
              name="Profile"
              src={`${ipApi}/images/${user.imagemperfil}`}
              cursor="pointer"
              onClick={handleAvatarClick}
            >
              <AvatarBadge borderColor="green" bg="green.500" boxSize="1.25em">
                <BiEdit />
              </AvatarBadge>
            </Avatar>
            <VisuallyHidden>
              <Input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                display="none"
              />
            </VisuallyHidden>
          </Box>
          <Text fontSize="xl" fontWeight="bold" marginTop={4}>
            {user.username}
          </Text>
          <Text fontSize="md" color="gray.500" marginTop={1}>
            <Flex align="center">
              Rank: {user.rank} {ImagemRank(RankAtual.rank, 30)}
            </Flex>
          </Text>
          <Button colorScheme="green" size="sm" m={{ base: 5, md: 10 }} p={5} onClick={() => { navigate('/upar-conta') }}>
            Upar conta agora
          </Button>
        </Box>
        <Box m={5} bg="#edf3f8" shadow="lg" width={{ base: '90vw', md: '100%' }} borderRadius={20} display='flex' flexDirection='column'>
          <Box display='flex' alignItems='center' justifyContent='center'>
            <Text fontSize={30} fontWeight={700}>Informações pessoais</Text>
          </Box>
          <Box m={5} border="1px" borderColor="gray.300" p={1} borderRadius="md" display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
            <Text>Codigo da conta:</Text>
            <Text fontSize={20}>{user.id}</Text>
          </Box>
          <Box m={5} border="1px" borderColor="gray.300" p={1} borderRadius="md">
            <Text>Nome: {user.name}</Text>
            <Text>Email: {user.email}</Text>
            <Text>Telefone: {formatarNumeroTelefone(user.telefone)}</Text>
            <Text>Saldo na conta: {FormalizarPrecos(parseFloat(user.valor))}</Text>
          </Box>
          <Box display='flex' alignItems='center' justifyContent='center'>
            <Text fontSize={30} fontWeight={700}>Informações de rank</Text>
          </Box>
          <Box m={5} border="1px" borderColor="gray.300" borderRadius="md" display='flex' flexDirection={{ base: 'column', md: 'row' }} alignItems='center' justifyContent='center'>
            <Box m={4} border="1px" borderColor="gray.300" borderRadius="md" >
              <Box py={4} px={7} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                <Text fontWeight="500" fontSize="2xl">
                  Rank Atual:
                </Text>
                {ImagemRank(RankAtual.rank, 150)}
                <HStack >
                  <Text fontWeight="500" fontSize="2xl">
                    {RankAtual.rank}
                  </Text>
                </HStack>
              </Box>
              <VStack
                bg='gray.50'
                borderBottomRadius={'xl'}>
                <List spacing={3} textAlign="start">
                  <ListItem m={2}>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Taxa de saque:
                    <Box display='flex' alignItems='center' justifyContent='center'>
                      <Text fontSize={20} fontWeight={700}> R$ {RankAtual.taxa_saque}</Text>
                    </Box>
                  </ListItem>
                  <ListItem m={2}>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Quantidade de anuncio:
                    <Box display='flex' alignItems='center' justifyContent='center'>
                      <Text fontSize={20} fontWeight={700}>{RankAtual.quantidade_anuncios}</Text>
                    </Box>
                  </ListItem>
                  <ListItem m={2}>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Taxa de venda:
                    <Box display='flex' alignItems='center' justifyContent='center'>
                      <Text fontSize={20} fontWeight={700}> {RankAtual.taxa_venda} %</Text>
                    </Box>
                  </ListItem>
                </List>
              </VStack>
            </Box>
            {RankAtual.rank === 'Premium' ? (
              <></>
            ) : (
              <>
                <Box display={{ base: "none", md: "flex" }}>
                  <BsArrowRight size={70} />
                </Box>
                <Box display={{ base: "flex", md: "none" }}>
                  <BsArrowDown size={50} />
                </Box>
                <Box m={4} border="1px" borderColor="gray.300" p={1} borderRadius="md">
                  <Box py={4} px={12} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                    <Text fontWeight="500" fontSize="2xl">
                      Proximo Rank:
                    </Text>
                    {ImagemRank(ProxRank.rank, 150)}
                    <HStack justifyContent="center">
                      <Text fontWeight="500" fontSize="2xl">
                        {ProxRank.rank}
                      </Text>
                    </HStack>
                  </Box>
                  <VStack
                    bg='gray.50'
                    py={4}
                    borderBottomRadius={'xl'}>
                    <List spacing={2} textAlign="start" px={4}>
                      <List spacing={3} textAlign="start">
                        <ListItem m={2}>
                          <ListIcon as={FaCheckCircle} color="green.500" />
                          Taxa de saque: R$
                          <Box display='flex' alignItems='center' justifyContent='center'>
                            <Text fontSize={20} fontWeight={700}> R$ {ProxRank.taxa_saque}</Text>
                          </Box>
                        </ListItem>
                        <ListItem m={2}>
                          <ListIcon as={FaCheckCircle} color="green.500" />
                          Quantidade de anuncio:
                          <Box display='flex' alignItems='center' justifyContent='center'>
                            <Text fontSize={20} fontWeight={700}>{ProxRank.quantidade_anuncios}</Text>
                          </Box>
                        </ListItem>
                        <ListItem m={2}>
                          <ListIcon as={FaCheckCircle} color="green.500" />
                          Taxa de venda:
                          <Box display='flex' alignItems='center' justifyContent='center'>
                            <Text fontSize={20} fontWeight={700}> {ProxRank.taxa_venda} %</Text>
                          </Box>
                        </ListItem>
                      </List>
                    </List>
                    <Box w="80%" pt={7} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                      {QuantidadeVendas === 0 ? (
                        <>
                          <Button w="full" colorScheme="red" variant="outline" onClick={() => { navigate('/upar-conta') }}>
                            Upar por:
                            <Text color='green' fontWeight={700} fontSize={20} m={1}>{ValorDescontado()}</Text>
                          </Button>
                          <Text mt={3} fontSize={10}>*Ou faça mais {parseFloat(ProxRank.quantidade_vendas) - QuantidadeVendas} vendas para upar gratuitamente</Text>
                        </>
                      ) : (
                        <>
                          <Text mt={3} fontSize={20} position="relative">
                            De: R$ {ProxRank.preco}
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
                          <Button w="full" colorScheme="red" variant="outline" onClick={() => { navigate('/upar-conta') }}>
                            Upar por:
                            <Text color='green' fontWeight={700} fontSize={20} m={1}>{ValorDescontado()}</Text>
                          </Button>
                          <Text mt={3} fontSize={10}>*Ou faça mais {parseFloat(ProxRank.quantidade_vendas) - QuantidadeVendas} vendas para upar gratuitamente</Text>
                        </>
                      )}

                    </Box>
                  </VStack>
                </Box>
              </>
            )}

          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default MeuPerfil;
