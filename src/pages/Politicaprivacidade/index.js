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
import { MdLock } from 'react-icons/md';

const PoliticaPrivacidade = () => {
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
        </Box>
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
          <MdLock size={40} />
          <Heading as="h2" size="xl" ml={{base: 0 , md: 5}} textAlign={'center'}>
            Política de Privacidade
          </Heading>
        </Box>

        <Stack spacing={4}>
          <Text>
            <strong>1. Coleta de Informações:</strong>
            <br />
            1.1. Coletamos informações pessoais, como nome, e-mail e informações de pagamento, durante o processo de compra.
            <br />
            1.2. Também podemos coletar dados de uso do site para melhorar a experiência do usuário.
            <br /><br />

            <strong>2. Uso de Informações:</strong>
            <br />
            2.1. As informações coletadas são utilizadas para processar pedidos, fornecer suporte e melhorar nossos produtos e serviços.
            <br />
            2.2. Não compartilhamos suas informações com terceiros, exceto quando necessário para processar transações.
            <br /><br />

            <strong>3. Segurança:</strong>
            <br />
            3.1. Implementamos medidas de segurança para proteger suas informações pessoais.
            <br />
            3.2. Utilizamos criptografia para proteger informações sensíveis, como dados de pagamento.
            <br /><br />

            <strong>4. Cookies:</strong>
            <br />
            4.1. Utilizamos cookies para melhorar a experiência do usuário e personalizar conteúdo.
            <br />
            4.2. Você pode optar por desativar os cookies nas configurações do navegador.
            <br /><br />

            <strong>5. Comunicações:</strong>
            <br />
            5.1. Podemos enviar e-mails relacionados a transações, atualizações e promoções.
            <br />
            5.2. Você pode optar por não receber comunicações promocionais.
            <br /><br />

            <strong>6. Acesso e Atualizações:</strong>
            <br />
            6.1. Você pode acessar e atualizar suas informações pessoais através da sua conta no site.
            <br /><br />

            <strong>7. Alterações na Política:</strong>
            <br />
            7.1. Reservamo-nos o direito de fazer alterações nesta política de privacidade. Informaremos sobre mudanças significativas.
            <br /><br />

          </Text>
        </Stack>
        <HStack spacing={4} justify="center" mt={5}></HStack>
      </Box>
      <Footer />
    </>
  );
};

export default PoliticaPrivacidade;