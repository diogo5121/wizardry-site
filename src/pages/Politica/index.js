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

const Politicareembolso = () => {
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
      </Box>
      <Box
        bg="#edf3f8"
        m={5}
        p={5}
        borderRadius={20}
        boxShadow="lg"
        textAlign='start'
      >
        <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'} mb={10}>
          <BiMoney size={40} />
          <Heading as="h2" size="xl" ml={{ base: 0, md: 5 }} textAlign={'center'}>
            Política de Reembolso
          </Heading>
        </Box>
        <Stack spacing={4}>
          <Text>
            <strong>1. Reembolsos Gerais:</strong>
            <br />
            1.1. Oferecemos reembolsos para produtos digitais adquiridos em nosso site dentro de um prazo de 7 dias a partir da data da compra original.
            <br />
            1.2. Para solicitar um reembolso, entre em contato conosco pelo contato@wizardry.com.br ou 81 996382552 e forneça as informações necessárias, incluindo o número do pedido e o motivo da solicitação.
            <br /><br />

            <strong>2. Condições para Reembolso:</strong>
            <br />
            2.1. O produto digital não deve ter sido baixado, acessado ou utilizado.
            <br />
            2.2. Se o produto digital foi defeituoso ou não conforme anunciado, entre em contato conosco para solucionar o problema antes de solicitar um reembolso.
            <br />
            2.3. Não aceitamos reembolsos para produtos digitais após o download ou acesso bem-sucedido.
            <br /><br />

            <strong>3. Processo de Reembolso:</strong>
            <br />
            3.1. Após aprovação da solicitação de reembolso, o valor será estornado para o mesmo método de pagamento utilizado na compra original.
            <br />
            3.2. O processamento do reembolso pode levar até 5 dias úteis.
            <br /><br />

            <strong>4. Problemas Técnicos:</strong>
            <br />
            4.1. Se o cliente encontrar problemas técnicos ao baixar ou acessar o produto digital, estamos disponíveis para fornecer suporte técnico antes de considerar um reembolso.
            <br />
            4.2. Caso não seja possível resolver o problema técnico, um reembolso será oferecido.
            <br /><br />

            <strong>5. Cancelamento de Serviços:</strong>
            <br />
            5.1. Para serviços digitais recorrentes, o cliente deve notificar-nos com 5 dias de antecedência para evitar cobranças futuras.
            <br />
            5.2. Não haverá reembolso para serviços digitais já utilizados ou acessados.
            <br /><br />

            <strong>6. Alterações na Política:</strong>
            <br />
            6.1. Reservamo-nos o direito de fazer alterações nesta política de reembolso sem aviso prévio. Quaisquer alterações entrarão em vigor imediatamente após serem publicadas em nosso site.
            <br /><br />
          </Text>
        </Stack>
        <HStack spacing={4} justify="center" mt={5} />
      </Box>
      <Footer />
    </>
  );
};

export default Politicareembolso;
