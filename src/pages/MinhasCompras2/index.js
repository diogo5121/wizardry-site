import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import headers from '../../Services/configapi'
import Footer from '../styles/footer';
import HeaderGlobal from '../styles/headerGlobal';
import ipApi from '../../Services/ipApi';
import { Avatar, Box, Button, Select, Spinner, Stack, Table, Tbody, Text, Th, Thead, Tr, VStack, useColorModeValue } from '@chakra-ui/react';
import PuxarCompras from './PuxarCompras';
import Pagination from './Pagination';
import InfoAnuncio from './Informacoes';
import ChatGeral from '../../Services/ChatGeral';
import { closeconnection, openconnection } from '../../Services/websocket';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import FinalizarVenda from './FinalizarVenda';
import Avaliacao from './Avaliacao';




const MinhasCompras2 = () => {
  const [username, setusername] = useState([])
  const [rank, setrank] = useState([])
  const [nomeCompleto, setNomeCompleto] = useState([])
  const [valor, setValor] = useState([])
  const [numero, setnumero] = useState([])
  const [imagemperfil, setimagemperfil] = useState([])
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth() + 1;
  const [messelecionado, setmesselecionado] = useState(mesAtual);
  const [totalPages, setTotalpage] = useState(1);
  const [NumeroPorPagina, setNumeroPorPagina] = useState(5);
  const [vendas, setVendas] = useState(false)
  const [vendasfinalizadas, setVendasFinalizadas] = useState(false)
  const [totalvendas, setTotalVendas] = useState(false)
  const [Quantidadevendas, setquantidadevendas] = useState(false)
  const [totalunidades, setTotalUnidades] = useState(false)
  const [InfoNav, setInfoNav] = useState(false)
  const [ChatNav, setChatNav] = useState(false)
  const [FinaNav, setFinaNav] = useState(false)
  const [AvaliacaoNav, setAvaliacaoNav] = useState(false)
  const [CompradorInfo, setCompradorInfo] = useState(false)
  const [VendaInfo, setVendaInfo] = useState(false)
  const [loading, setLoading] = useState(false)
  const [atualizar, SetAtualizar] = useState(1)


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

            const dataa = {
              tabela: 'Compras',
              item: 'UidVendedor',
              valoritem: localStorage.getItem('uid'),
            };
            axios.post(`${ipApi}/api/banco/consultaespecifica`, dataa, { headers })
              .then(response => {
                setVendas(response.data.message)
                const arr = response.data.message
                let soma = 0;
                let QuantidadeUnidades = 0;
                let QuantidadeVendas = 0;

                const vendasFinalizadas = arr.filter(venda => venda.statusdacompra === 'finalizado')
                setVendasFinalizadas(vendasFinalizadas.length)
                arr.forEach(obj => {
                  const dataString = obj.data_criacao;
                  const data = new Date(dataString);
                  const numeroDoMes = data.getMonth() + 1
                  if (obj) {
                    if (numeroDoMes === messelecionado) {
                      if (obj.statusdacompra === 'approved' || obj.statusdacompra === 'finalizado') {
                        const stringNumero = obj.valordacompra
                        const numero = stringNumero.includes('.') ? parseFloat(stringNumero) : parseInt(stringNumero, 10);

                        const stringNumero2 = obj.quantidadedacompra
                        const numero2 = parseFloat(stringNumero2)

                        const stringNumero3 = 1
                        const numero3 = parseFloat(stringNumero3)

                        soma += numero;
                        QuantidadeUnidades += numero2;
                        QuantidadeVendas += numero3;
                      }
                    }
                  }
                });
                setTotalUnidades(QuantidadeUnidades)
                setTotalVendas(soma.toFixed(2))
                setquantidadevendas(QuantidadeVendas)
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
  }, [atualizar])

  const handlenumeroporpagina = (e) => {
    const novonumeroporpagina = e.target.value;
    setNumeroPorPagina(novonumeroporpagina)

  };


  const DeletarVenda = () => {
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
      {AvaliacaoNav && (
        <Box
          pos="fixed"
          top={0}
          right={0}
          bottom={0}
          left={0}
          bg="rgba(0, 0, 0, 0.5)" // Cor de fundo semitransparente
          zIndex={10}
          onClick={() => { setAvaliacaoNav(false) }}
        />
      )}
      {ChatNav && (
        <Box
          pos="fixed"
          top={0}
          right={0}
          bottom={0}
          left={0}
          bg="rgba(0, 0, 0, 0.5)" // Cor de fundo semitransparente
          zIndex={10}
          onClick={() => { setChatNav(false) }}
        />
      )}
      {FinaNav && (
        <Box
          pos="fixed"
          top={0}
          right={0}
          bottom={0}
          left={0}
          bg="rgba(0, 0, 0, 0.5)" // Cor de fundo semitransparente
          zIndex={10}
          onClick={() => { setFinaNav(false) }}
        />
      )}
      <VStack
        pos="fixed"
        top={0}
        right={0}
        bottom={0}
        display={FinaNav ? "flex" : "none"}
        p={2}
        bg={useColorModeValue("white", "gray.800")}
        shadow="sm"
        zIndex={20}
      >
        {FinalizarVenda(VendaInfo, setFinaNav, CompradorInfo)}
      </VStack>
      <VStack
        pos="fixed"
        top={0}
        right={0}
        bottom={0}
        display={ChatNav ? "flex" : "none"}
        p={2}
        bg={useColorModeValue("white", "gray.800")}
        shadow="sm"
        zIndex={20}
      >
        <Box>
          <Box alignItems='center' justifyContent='center' display="flex" mt={3} >
            <Text fontWeight={800}>Informações da compra</Text>
          </Box>
          <Box flexDirection="row" display='flex' maxWidth={{ base: '350px', md: '500px' }}>
            <Box>
              <Text>Id da compra: {VendaInfo.id}</Text>
            </Box>
            <Box marginLeft={2}>
              <Text>Vendedor: {CompradorInfo.username}</Text>
            </Box>
          </Box>
        </Box>
        {ChatGeral(VendaInfo.uid, VendaInfo.uidvendedor, VendaInfo.id, setChatNav, VendaInfo, CompradorInfo)}
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
      <VStack
        pos="fixed"
        top={0}
        right={0}
        bottom={0}
        display={AvaliacaoNav ? "flex" : "none"}
        p={2}
        bg={useColorModeValue("white", "gray.800")}
        spacing={3}
        shadow="sm"
        zIndex={20}
      >

        {Avaliacao(VendaInfo, setAvaliacaoNav, CompradorInfo, SetAtualizar, atualizar)}
      </VStack>
      <Box Box display='flex' bg="#edf3f8" flexDirection='column' justifyContent='center' alignItems='center' m={{ base: 2, md: 5 }} shadow="lg" borderRadius={20}>
        <Box display='flex' bg="#edf3f8" flexDirection={{ base: 'column', md: 'row' }} justifyContent='space-between' borderRadius={20}>
          <Box alignItems='center' display='flex' flexDirection='row' m={1} marginLeft={{ base: 0, md: 20 }}>
            <AiOutlineShoppingCart size={40} />
            <Text fontWeight={700} fontSize={30} marginLeft={{ base: 4, md: 9 }} >Suas Compras</Text>
          </Box>
        </Box>
      </Box>
      <Box display='flex' flexDirection={{ base: 'column', md: 'row' }} alignItems={{ base: "center", md: 'flex-start' }} justifyContent="center" >
        <Box maxHeight='350px' margin={5} bg="#edf3f8" display={{base: 'none', md:'flex'}} flexDirection="column" alignItems="center" height="80vh" width={{ base: "90vw", md: '40vw' }} shadow="lg" borderRadius={20}>
          <Text fontSize={20} color="green" marginTop={5} fontWeight={800}>
            Sua Conta
          </Text>
          {loading ? (
            <Spinner />
          ) : (
            <Avatar
              size='lg'
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
          <Box display="flex" alignItems="center">
            <Text fontSize="sm" marginLeft={{ base: 3, md: 20 }}>Compras por página:</Text>
            <Stack spacing={3} >
              <Select variant='filled' value={NumeroPorPagina} size='sm' onChange={(e) => { handlenumeroporpagina(e); setCurrentPage(1) }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </Select>
            </Stack>
          </Box>


          <Table variant='simple' colorScheme='teal' size={{ base: 'sm', md: 'md' }} responsive>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Anuncio</Th>
                <Th display={{ base: 'none', md: 'table-cell' }}>Vendedor</Th>
                <Th>Valor</Th>
                <Th display={{ base: 'none', md: 'table-cell' }}>Status</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {PuxarCompras(currentPage, NumeroPorPagina, setTotalpage, setVendaInfo, setInfoNav, setCompradorInfo, setChatNav, setFinaNav, setAvaliacaoNav, atualizar)}
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

export default MinhasCompras2;
