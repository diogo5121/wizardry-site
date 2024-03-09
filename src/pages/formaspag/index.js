import React from 'react';
import {
  Box,
  Text,
  Heading,
  Stack,
  VStack,
  Center,
  HStack,
} from '@chakra-ui/react';
import HeaderGlobal from '../styles/headerGlobal';
import Footer from '../styles/footer';
import { BiMoney } from 'react-icons/bi';
import { MdPix } from 'react-icons/md';

const FormasPag = () => {
  return (
    <>
      <HeaderGlobal />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        bg="#edf3f8"
        m={2}
        shadow="lg"
        borderRadius={20}
      >
        <Box
          display="flex"
          flexDirection={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
          borderRadius={20}
        >
          <Box
            alignItems="center"
            display="flex"
            flexDirection="row"
            m={1}
            marginLeft={{ base: 0, md: 20 }}
          >
            <BiMoney size={40} />
            <Text fontWeight={700} fontSize={30} marginLeft={10}>
              Formas de pagamento
            </Text>
          </Box>
        </Box>
      </Box>
      <Box
        bg="#edf3f8"
        m={5}
        p={5}
        borderRadius={20}
        boxShadow="lg"
        textAlign="center"
      >
        <Heading as="h2" size="xl" mb={5}>
          Formas:
        </Heading>
        <Stack spacing={4}>
          <Text>
            Na Wizardry, facilitamos suas transações oferecendo diversas formas de pagamento, proporcionando flexibilidade e comodidade para nossos usuários.
          </Text>
          <Text>
            Trabalhamos em parceria com o checkout do Mercado Pago, uma plataforma segura e confiável, para garantir que cada transação seja processada com a máxima segurança.
          </Text>
          <Text>
            Aceitamos todas as formas de pagamento, incluindo cartões de crédito, PIX, boleto bancário e muito mais. Dessa forma, você pode escolher a opção que melhor atenda às suas preferências.
          </Text>
        </Stack>

        <HStack spacing={4} justify="center" mt={5}>

        </HStack>
      </Box>
      <Footer />
    </>
  );
};

export default FormasPag;
