import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios'
import headers from '../../Services/configapi'
import Footer from '../styles/footer';
import HeaderGlobal from '../styles/headerGlobal';
import ipApi from '../../Services/ipApi';
import { Avatar, Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Checkbox, CloseButton, Flex, FormControl, GridItem, Heading, Icon, Image, Select, SimpleGrid, Spinner, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, VStack, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { BsBank, BsGraphUp } from 'react-icons/bs';
import { BiBox, BiCheck, BiDonateHeart, BiMoney, BiMoneyWithdraw } from 'react-icons/bi';
import PuxarVendas from './PuxarAnuncios';
import PuxarAnunciosRecentes from './PuxarAnunciosRecente';
import { IoGameController, IoPeopleSharp } from "react-icons/io5";
import { MdMiscellaneousServices } from "react-icons/md";




const SubCategorias = () => {
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
  const [SaldoProcessando, setSaldoProcessando] = useState(false)
  const [SaldoBloqueado, setSaldoBloqueado] = useState(false)
  const [totalunidades, setTotalUnidades] = useState(false)
  const [InfoNav, setInfoNav] = useState(false)
  const [MenuSaqueNav, setMenuSaqueNav] = useState(false)
  const [ChatNav, setChatNav] = useState(false)
  const [VendaNav, setVendaNav] = useState(false)
  const [CompradorInfo, setCompradorInfo] = useState(false)
  const [VendaInfo, setVendaInfo] = useState(false)
  const [loading, setLoading] = useState(false)
  const [usuarioInfo, setUsuarioInfo] = useState(false)
  const [infoSubCategorias, setinfoSubCategorias] = useState([]);
  const { id } = useParams();
  const sanitizeInput = (inputValue) => {
    return inputValue.replace(/['"{}()´]/g, '');
  };

  useEffect(() => {

    const Executar = () => {
      const data = {
        tabela: 'subcategorias',
        item: 'valor',
        valoritem: sanitizeInput(id),
      };
      axios.post(`${ipApi}/api/banco/consultaespecifica`, data, { headers }).then(response => {
        setinfoSubCategorias(response.data.message[0])
      }).catch(err => {
        console.log(err)
      })

    }
    Executar()

  }, [])


  return (
    <>
      <HeaderGlobal />
      <Box bg="#edf3f8" p={{ base: 1, md: 10 }}>
        <Box display='flex' bg="#edf3f8" flexDirection='column' justifyContent='center' alignItems='center'>
          <Box alignItems='center' display='flex'>
            <Text fontWeight={730} fontSize={30} marginLeft={10} >Anuncios de {infoSubCategorias.nomesubcategoria}</Text>
          </Box>
        </Box>
        <Box display='flex' alignItems='center' flexDirection='column' mb={5} mt={10}>
          <Text fontWeight={800} fontSize={20}>Anuncios em destaque</Text>
        </Box>

        <SimpleGrid spacing={{ base: 2, md: 4 }} templateColumns={{ base: 'repeat(auto-fill, minmax(150px, 2fr))', md: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {PuxarVendas(id)}
        </SimpleGrid>
      </Box>

      <Box bg="#edf3f8" p={{ base: 1, md: 10 }}>
        <Box display='flex' alignItems='center' flexDirection='column' mb={5}>
          <Text fontWeight={800} fontSize={20}>Todos os anuncios</Text>
        </Box>
        <SimpleGrid spacing={{ base: 2, md: 4 }} templateColumns={{ base: 'repeat(auto-fill, minmax(150px, 2fr))', md: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {PuxarAnunciosRecentes(id)}
        </SimpleGrid>
      </Box>

      <Footer />
    </>
  );
};

export default SubCategorias;
