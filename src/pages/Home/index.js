import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
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






const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {

  }, [])


  return (
    <>
      <HeaderGlobal />
      <Box display='flex' bg="#edf3f8" flexDirection='column' justifyContent='center' alignItems='center'>
        <Box alignItems='center' display='flex'>
          <Text fontWeight={730} fontSize={{ base: 20, md: 30 }} marginLeft={10} >CATEGORIAS</Text>
        </Box>
        <Box display='flex' flexDirection={{ base: 'row', md: 'row' }} justifyContent='center' alignItems='center' >
          <Box
            bgColor='green.300'
            width={{ base: '110px', md: '200px' }}
            height={{ base: '110px', md: '350px' }}
            m={{ base: 2, md: 5 }}
            shadow="lg"
            borderRadius={20}
            display='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
            cursor='pointer'
            onClick={() => { navigate('/categorias/redes') }}
            position="relative" // Importante para posicionar a imagem de fundo corretamente
            transition="transform 0.3s ease-in-out" // Adiciona uma transição suave para a propriedade transform
            _hover={{
              transform: 'scale(1.1)', // Aumenta o tamanho em 10% quando o mouse estiver sobre o elemento
            }}
          >

            <Box
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              bgImage={`${ipApi}/images/redes.jpg`} // Substitua pelo caminho da sua imagem
              bgSize="cover"
              bgPosition="center"
              opacity={0.5} // Ajuste a opacidade conforme necessário
              borderRadius={20} // Igual ao valor de borderRadius do Box principal
            />
            <Box zIndex={1}
              display='flex'
              alignItems='center'
              justifyContent='center'
              flexDirection='column'>
              <IoPeopleSharp size={40} color='black' /><Text fontWeight={800} fontSize={{ base: 20, md: 30 }} color='black'>Redes</Text>
            </Box>

          </Box>
          <Box
            bgColor='green.300'
            width={{ base: '110px', md: '200px' }}
            height={{ base: '110px', md: '350px' }}
            m={{ base: 2, md: 5 }}
            shadow="lg"
            borderRadius={20}
            display='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
            cursor='pointer'
            onClick={() => { navigate('/categorias/jogos') }}
            position="relative" // Importante para posicionar a imagem de fundo corretamente
            transition="transform 0.3s ease-in-out" // Adiciona uma transição suave para a propriedade transform
            _hover={{
              transform: 'scale(1.1)', // Aumenta o tamanho em 10% quando o mouse estiver sobre o elemento
            }}

          >

            <Box
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              bgImage={`${ipApi}/images/jogos.jpg`} // Substitua pelo caminho da sua imagem
              bgSize="cover"
              bgPosition="center"
              opacity={0.5} // Ajuste a opacidade conforme necessário
              borderRadius={20} // Igual ao valor de borderRadius do Box principal
            />
            <Box zIndex={1}
              display='flex'
              alignItems='center'
              justifyContent='center'
              flexDirection='column'>
              <IoGameController size={40} color='black' /><Text fontWeight={800} fontSize={{ base: 20, md: 30 }} color='black'>Jogos</Text>
            </Box>

          </Box>
          <Box
            bgColor='green.300'
            width={{ base: '110px', md: '200px' }}
            height={{ base: '110px', md: '350px' }}
            m={{ base: 2, md: 5 }}
            shadow="lg"
            borderRadius={20}
            display='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
            cursor='pointer'
            onClick={() => { navigate('/categorias/servico') }}
            position="relative" // Importante para posicionar a imagem de fundo corretamente
            transition="transform 0.3s ease-in-out" // Adiciona uma transição suave para a propriedade transform
            _hover={{
              transform: 'scale(1.1)', // Aumenta o tamanho em 10% quando o mouse estiver sobre o elemento
            }}

          >

            <Box
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              bgImage={`${ipApi}/images/servicos.jpg`} // Substitua pelo caminho da sua imagem
              bgSize="cover"
              bgPosition="center"
              opacity={0.5} // Ajuste a opacidade conforme necessário
              borderRadius={20} // Igual ao valor de borderRadius do Box principal
            />
            <Box zIndex={1}
              display='flex'
              alignItems='center'
              justifyContent='center'
              flexDirection='column'>
              <MdMiscellaneousServices size={40} color='black' /><Text fontWeight={800} fontSize={{ base: 20, md: 30 }} color='black'>Serviços</Text>
            </Box>

          </Box>

        </Box>
      </Box>

      <Box bg="#edf3f8" p={{ base: 1, md: 10 }}>
        <Box display='flex' alignItems='center' flexDirection='column' mb={5}>
          <Text fontWeight={800} fontSize={20}>Anuncios em destaque</Text>
        </Box>

        <SimpleGrid spacing={{ base: 2, md: 4 }} templateColumns={{ base: 'repeat(auto-fill, minmax(150px, 2fr))', md: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          <PuxarVendas />
        </SimpleGrid>
      </Box>

      <Box bg="#edf3f8" p={{ base: 1, md: 10 }}>
        <Box display='flex' alignItems='center' flexDirection='column' mb={5}>
          <Text fontWeight={800} fontSize={20}>Anuncios Recentes</Text>
        </Box>
        <SimpleGrid spacing={{ base: 2, md: 4 }} templateColumns={{ base: 'repeat(auto-fill, minmax(150px, 2fr))', md: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          <PuxarAnunciosRecentes />
        </SimpleGrid>
      </Box>

      <Footer />
    </>
  );
};

export default Home;
