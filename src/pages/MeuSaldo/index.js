import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import headers from '../../Services/configapi'
import Footer from '../styles/footer';
import HeaderGlobal from '../styles/headerGlobal';
import ipApi from '../../Services/ipApi';
import { Avatar, Box, Button, ButtonGroup, Checkbox, CloseButton, Flex, FormControl, GridItem, Select, Spinner, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, VStack, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { BsBank } from 'react-icons/bs';
import { BiCheck, BiHeartCircle, BiMoneyWithdraw } from 'react-icons/bi';
import PuxarVendas from './PuxarVendas';
import Pagination from './Pagination';
import InfoAnuncio from './Informacoes';
import { closeconnection, openconnection } from '../../Services/websocket';
import { ImBlocked } from "react-icons/im";
import Comprovante from './comprovante';
import MenuSaque from './MenuSaque';




const MeuSaldo = () => {
  const [username, setusername] = useState([])
  const [rank, setrank] = useState([])
  const [nomeCompleto, setNomeCompleto] = useState([])
  const [valor, setValor] = useState([])
  const [numero, setnumero] = useState([])
  const [imagemperfil, setimagemperfil] = useState([])
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalpage] = useState(1);
  const [NumeroPorPagina, setNumeroPorPagina] = useState(5);
  const [vendas, setVendas] = useState(false)
  const [SaldoProcessando, setSaldoProcessando] = useState(false)
  const [SaldoBloqueado, setSaldoBloqueado] = useState(false)
  const [InfoNav, setInfoNav] = useState(false)
  const [MenuSaqueNav, setMenuSaqueNav] = useState(false)
  const [ChatNav, setChatNav] = useState(false)
  const [VendaNav, setVendaNav] = useState(false)
  const [CompradorInfo, setCompradorInfo] = useState(false)
  const [VendaInfo, setVendaInfo] = useState(false)
  const [loading, setLoading] = useState(false)
  const [usuarioInfo, setUsuarioInfo] = useState(false)

  useEffect(() => {
    const handleChatNavTrue = () => {
      console.log('ChatNav foi setado para TRUE');
      // openconnection()
    };

    const handleChatNavFalse = () => {
      // closeconnection()
      console.log('ChatNav foi setado para false');
    };

    // Verificar o valor de ChatNav e executar a função apropriada
    if (ChatNav) {
      handleChatNavTrue();
    } else {
      handleChatNavFalse();
    }
  }, [ChatNav]);


  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Lógica adicional para buscar dados da nova página, se necessário
  };

  useEffect(() => {
    setLoading(true)
    const getUsers = async () => {
      const data = {
        tabela: 'users',
        item: 'email',
        valoritem: localStorage.getItem('email'),
      };

      await axios.post(`${ipApi}/api/banco/consultaespecifica`, data, { headers })
        .then(response => {
          if (response.sucess = true) {
            setValor(response.data.message[0].valor)
            setnumero(response.data.message[0].telefone)
            setusername(response.data.message[0].username)
            setNomeCompleto(response.data.message[0].name)
            setrank(response.data.message[0].rank)
            setimagemperfil(response.data.message[0].imagemperfil)
            setUsuarioInfo(response.data.message[0])


            const dataa = {
              tabela: 'processamentosaldo',
              item: 'uid',
              valoritem: localStorage.getItem('uid'),
            };

            axios.post(`${ipApi}/api/banco/consultaespecifica`, dataa, { headers })
              .then(response => {
                setVendas(response.data.message)
                const arr = response.data.message
                let SaldoProcessando = 0;
                let SaldoBloqueado = 0;

                arr.forEach(obj => {
                  if (obj) {
                    if (obj.status === 'processando') {
                      const stringNumero = obj.valor
                      const numero = stringNumero.includes('.') ? parseFloat(stringNumero) : parseInt(stringNumero, 10);

                      SaldoProcessando += numero;
                    }
                    if (obj.status === 'bloqueado') {
                      const stringNumero2 = obj.valor
                      const numero2 = stringNumero2.includes('.') ? parseFloat(stringNumero2) : parseInt(stringNumero2, 10);

                      SaldoBloqueado += numero2;
                    }
                  }
                });
                setSaldoBloqueado(SaldoBloqueado)
                setSaldoProcessando(SaldoProcessando)
                setLoading(false)

              })
              .catch(error => {
                setLoading(false)
                console.log(error)
              });
          } else {
          }
        })
        .catch(error => {
        });

    }
    getUsers()
  }, [])

  const handlenumeroporpagina = (e) => {
    const novonumeroporpagina = e.target.value;
    setNumeroPorPagina(novonumeroporpagina)

  };


  const DeletarVenda = () => {
    console.log('deletando sua Venda')
  }

  return (
    <>
      <HeaderGlobal />
      {InfoNav && (
        <Box
          pos="fixed"
          top={0}
          right={0}
          bottom={0}
          left={0}
          bg="rgba(0, 0, 0, 0.5)" // Cor de fundo semitransparente
          zIndex={10}
          onClick={() => { setInfoNav(false) }}
        />
      )}
      {VendaNav && (
        <Box
          pos="fixed"
          top={0}
          right={0}
          bottom={0}
          left={0}
          bg="rgba(0, 0, 0, 0.5)" // Cor de fundo semitransparente
          zIndex={10}
          onClick={() => { setVendaNav(false) }}
        />
      )}
      {MenuSaqueNav && (
        <Box
          pos="fixed"
          top={0}
          right={0}
          bottom={0}
          left={0}
          bg="rgba(0, 0, 0, 0.5)" // Cor de fundo semitransparente
          zIndex={10}
          onClick={() => { setMenuSaqueNav(false) }}
        />
      )}
      <VStack
        pos="fixed"
        top={0}
        right={0}
        bottom={0}
        display={VendaNav ? "flex" : "none"}
        p={2}
        bg={useColorModeValue("white", "gray.800")}
        shadow="sm"
        zIndex={20}
      >
        {Comprovante(VendaInfo, setVendaNav)}
      </VStack>
      <VStack
        pos="fixed"
        top={0}
        right={0}
        bottom={0}
        display={MenuSaqueNav ? "flex" : "none"}
        p={2}
        bg={useColorModeValue("white", "gray.800")}
        shadow="sm"
        zIndex={20}
      >
        {MenuSaque(setMenuSaqueNav, usuarioInfo)}
      </VStack>
      <VStack
        pos="fixed"
        top={0}
        right={0}
        bottom={0}
        display={InfoNav ? "flex" : "none"}
        p={2}
        bg={useColorModeValue("white", "gray.800")}
        spacing={3}
        shadow="sm"
        zIndex={20}
      >

        {InfoAnuncio(VendaInfo, setInfoNav, CompradorInfo)}
      </VStack>
      <Box Box display='flex' bg="#edf3f8" flexDirection='column' justifyContent='center' alignItems='center' m={{ base: 2, md: 5 }} shadow="lg" borderRadius={20}>
        <Box display='flex' bg="#edf3f8" flexDirection={{ base: 'column', md: 'row' }} justifyContent='space-between' borderRadius={20}>
          <Box alignItems='center' display='flex' flexDirection='row' m={1} marginLeft={{ base: 0, md: 20 }}>
            <BsBank size={40} />
            <Text fontWeight={700} fontSize={30} marginLeft={{ base: 4, md: 9 }} >Seu Saldo</Text>
          </Box>
        </Box>
      </Box>

      <Box Box display='flex' bg="#edf3f8" flexDirection='column' justifyContent='center' alignItems='center' m={{ base: 4, md: 10 }} shadow="lg" borderRadius={20}>
        <Box display='flex' bg="#edf3f8" flexDirection={{ base: 'row', md: 'row' }} alignItems='center' borderRadius={20}>


          <Box alignItems='center' display='flex' flexDirection='column' m={1} border="1px" borderColor="gray.300" borderRadius="md" p={2} w={{base: 100, md: 270}} h={{base: 175, md: 175}}>
            <Box display={{ base: "none", md: "flex" }}>
              <ImBlocked size={70} color='red' />
            </Box>
            <Box display={{ base: "flex", md: "none" }}>
              <ImBlocked size={40} color='red' />
            </Box>
            <Text fontWeight={700} fontSize={{ base: 15, md: 20 }} textAlign={'center'} mt={{base: 8 , md: 0}}>Saldo Bloqueado:</Text>
            <Text fontSize={{ base: 25, md: 35 }} color='green' fontWeight={700}>R$ {SaldoBloqueado}{SaldoBloqueado === false && (0)}</Text>
          </Box>

          <Box alignItems='center' display='flex' flexDirection='column' m={1} border="1px" borderColor="gray.300" borderRadius="md" p={2} w={{base: 100, md: 270}} h={{base: 175, md: 175}}>
            <Spinner
              thickness='4px'
              speed='1s'
              emptyColor='gray.200'
              color='orange.500'
              size={{base:'xl'}}
            />
            <Text fontWeight={700} fontSize={{ base: 15, md: 20 }} mt={{base: 7 , md: 5}} textAlign={'center'}>Saldo em andamento:</Text>
            <Text fontSize={{ base: 25, md: 35 }} color='green' fontWeight={700}>R$ {SaldoProcessando}{SaldoProcessando === false && (0)}</Text>
          </Box>
          <Box alignItems='center' display='flex' flexDirection='column' m={1} border="1px" borderColor="gray.300" borderRadius="md" p={2} w={{base: 100, md: 270}} h={{base: 175, md: 175}}>
            <BiCheck size={70} color='green' />
            <Text fontWeight={700} fontSize={{ base: 15, md: 20 }} textAlign={'center'}>Disponivel para retirada:</Text>
            <Text fontSize={{ base: 25, md: 35 }} color='green' fontWeight={700}>R$ {parseFloat(valor).toFixed(2)}</Text>
          </Box>
        </Box>
        <Box>
          <ButtonGroup flexDirection={{ base: 'column', md: 'row' }} alignItems='center' display='flex'>
            <Button
              m={{ base: 2, md: 5 }}
              size="sm"
              variant="solid"
              colorScheme="gree"
              bg="green.500"
              p={5}
              onClick={() => { setMenuSaqueNav(true) }}
              isDisabled={parseFloat(valor) === 0}
            >
              <BiMoneyWithdraw size={20} />Realizar Saque
            </Button>
            <Button
              m={{ base: 2, md: 5 }}
              size="sm"
              variant="solid"
              colorScheme="gree"
              bg="green.500"
              p={5}
              onClick={() => { setMenuSaqueNav(true) }}
              isDisabled={true}
            >
              <BiHeartCircle size={20} />Fazer doação - EM BREVE
            </Button>
          </ButtonGroup>
        </Box>
      </Box>

      <Box display={'flex'} flexDirection={{ base: 'column', md: 'row' }} alignItems={{ base: "center", md: 'flex-start' }} justifyContent="center" >
        <Box maxHeight='350px' margin={5} bg="#edf3f8" display={{base: 'none', md:'flex'}} flexDirection="column" alignItems="center" height="80vh" width={{ base: "90vw", md: '40vw' }} shadow="lg" borderRadius={20}>
          <Text fontSize={20} color="green" marginTop={{base: 2 , md: 5}} fontWeight={800}>
            Sua Conta
          </Text>
          {loading ? (
            <Spinner />
          ) : (
            <Avatar
              size='xl'
              marginTop={10}
              name="Profile"
              src={`${ipApi}/images/${imagemperfil}`}
            />
          )}

          <Text fontSize="xl" fontWeight="bold" marginTop={4}>
            {username}
          </Text>
          <Text fontSize="md" color="gray.500" marginTop={1}>
            Rank: {rank}
          </Text>
          <Button colorScheme="green" size="sm" mt={10} p={5} onClick={() => { navigate("/upar-conta") }}>
            Upar conta agora
          </Button>
        </Box>
        <Box m={5} bg="#edf3f8" shadow="lg" width={{ base: "90vw", md: '100%' }} borderRadius={20}>
          <Box display='flex' flexDirection='row'>
            <Text fontSize="md" margin={4} fontWeight={600} >Historico de saques</Text>
            <Box display="flex" alignItems="center">
              <Text fontSize="sm" marginLeft={{ base: 3, md: 20 }}>Informações por página:</Text>
              <Stack spacing={3} >
                <Select variant='filled' value={NumeroPorPagina} size='sm' onChange={(e) => { handlenumeroporpagina(e) }}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                </Select>
              </Stack>
            </Box>
          </Box>

          <Table variant='simple' colorScheme='teal' size={{ base: 'sm', md: 'md' }} responsive>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th display={{ base: 'none', md: 'table-cell' }}>Tipo de saque</Th>
                <Th>Valor</Th>
                <Th>Status</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {PuxarVendas(currentPage, NumeroPorPagina, setTotalpage, setVendaInfo, setInfoNav, setCompradorInfo, setChatNav, setVendaNav, usuarioInfo)}
            </Tbody>
          </Table>
          <Box justifyContent="center" alignItems="center" display="flex">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default MeuSaldo;
