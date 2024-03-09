import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../styles/footer';
import HeaderGlobal from '../styles/headerGlobal';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import PuxarVendas from './PuxarAnuncios';
import PuxarAnunciosRecentes from './PuxarAnunciosRecente';
import PuxarSubCategorias from './PuxarSubcategorias';
import { BsPeople } from 'react-icons/bs';




const Categorias = () => {
  const { id } = useParams();



  useEffect(() => {

  }, [])


  return (
    <>
      <HeaderGlobal />
      <Box bg="#edf3f8" >
      <Box display='flex' bg="#edf3f8" flexDirection='column' justifyContent='center' alignItems='center'>
        <Box alignItems='center' display='flex' flexDirection={'column'}>
          <Box alignItems='center' display='flex' flexDirection={'row'}>
            <Text fontWeight={730} fontSize={30} mb={6} color={'green'}>Categoria: {id === 'redes' && (<>Redes Sociais</>)}{id === 'jogos' && (<>Jogos</>)}{id === 'servico' && (<>Serviços</>)}</Text>
          </Box>
          <Text fontWeight={700} fontSize={30} mb={2}>Subcategorias:</Text>
        </Box>

        <SimpleGrid
          alignItems={'center'}
          templateColumns={{ base: 'repeat(auto-fill, minmax(80px, 1fr))', md: 'repeat(auto-fill, minmax(100px, 1fr))' }}
          spacing={{ base: 0, md: 6 }}
          w={'100%'}
        >
          {PuxarSubCategorias(id)}
        </SimpleGrid>


      </Box>

      <Box bg="#edf3f8" p={{ base: 1, md: 10 }} mt={6}>
        <Box display='flex' alignItems='center' flexDirection='column' mb={5}>
          <Text fontWeight={700} fontSize={20}>Anuncios em destaque</Text>
        </Box>

        <SimpleGrid spacing={{ base: 2, md: 4 }} templateColumns={{ base: 'repeat(auto-fill, minmax(150px, 2fr))', md: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {PuxarVendas(id)}
        </SimpleGrid>
      </Box>

      <Box bg="#edf3f8" p={{ base: 1, md: 10 }}>
        <Box display='flex' alignItems='center' flexDirection='column' mb={5}>
          <Text fontWeight={700} fontSize={20}>Anuncios Recentes</Text>
        </Box>
        <SimpleGrid spacing={{ base: 2, md: 4 }} templateColumns={{ base: 'repeat(auto-fill, minmax(150px, 2fr))', md: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {PuxarAnunciosRecentes(id)}
        </SimpleGrid>
      </Box>

      <Footer />
      </Box>
    </>
  );
};

export default Categorias;
