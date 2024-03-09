import React, { useEffect, useState } from 'react';
import ipApi from '../../Services/ipApi';
import { Box, Button, Image, Spinner, Text } from '@chakra-ui/react';
import { SlActionUndo } from 'react-icons/sl';




const Comprovante = (venda, setNav) => {
  const [url, seturl] = useState('')
  const [loading, setLoading] = useState('')



  useEffect(() => {
    setLoading(true)
    const definindo = () => {
      seturl(`${ipApi}/images/${venda.comprovante}`)
      setLoading(false)
    }
    definindo()
  }, [venda])

  if (loading) {
    return (
      <>
        <Spinner size='lg' color='green' />
        <Text>CARREGANDO...</Text>
      </>
    )


  } else {
    return (
      <>
        <Box display='flex' alignItems='center' flexDirection='column' m={10}>
          <Box bgColor='green.400' m={50}>
            <Text fontWeight={600} fontSize={20}>Seu Comprovante:</Text>
          </Box>

          <Box>
            <Image src={url} alt='comprovante' boxSize='150px'/>
          </Box>
        </Box>
        <Button
          m={3}
          type="submit"
          colorScheme="red"
          _focus={{
            shadow: "",
          }}
          fontWeight="md"
          onClick={() => { setNav(false) }}
        >
          <SlActionUndo />Voltar
        </Button>
      </>
    );
  }

};

export default Comprovante;
