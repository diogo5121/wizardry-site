import React from 'react';
import {
  Box,
  Text,
  Heading,
  Stack,
  HStack,
} from '@chakra-ui/react';
import HeaderGlobal from '../styles/headerGlobal';
import Footer from '../styles/footer';
import { BiMoney } from 'react-icons/bi';

const TarifaPrazo = () => {
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
              Tarifa e Prazos
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
          Regras:
        </Heading>
        <Stack spacing={4}>
          <Text>
            Na Wizardry, acreditamos em recompensar nossos usuários à medida que crescem conosco. Nossa estrutura de tarifas e prazos é projetada para oferecer benefícios aos nossos vendedores com base no seu rank na plataforma.
          </Text>
          <Text>
            - Rank Inicial: Taxa de venda de 6,99% e taxa de saque de R$2,00.
          </Text>
          <Text>
            - Rank Avançado: Taxa de venda reduzida automaticamente com o aumento do rank, chegando a 4,99% de taxa de venda e taxa de saque gratuita, e vários outros benefícios dentro da plataforma.
          </Text>
          <Text>
            O prazo de liberação do dinheiro ocorre automaticamente após 14 dias da aprovação da venda. Além disso, caso o cliente confirme o recebimento do produto, o valor da compra é liberado instantaneamente para o vendedor.
          </Text>
        </Stack>
      </Box>
      <Footer />
    </>
  );
};

export default TarifaPrazo;
