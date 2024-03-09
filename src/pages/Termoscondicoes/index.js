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

const TermoCondicoes = () => {
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
          <Heading as="h2" size="xl" ml={{ base: 0, md: 5 }} textAlign={'center'}>
            Termos e Condições de Uso
          </Heading>
        </Box>
        <Stack spacing={4}>
          <Text>
            <strong>1. Aceitação dos Termos:</strong>
            <br />
            1.1. Ao acessar e utilizar este site, você concorda com os Termos e Condições de Uso aqui apresentados.
            <br /><br />

            <strong>2. Uso do Conteúdo:</strong>
            <br />
            2.1. Todo o conteúdo disponível neste site é protegido por direitos autorais e propriedade intelectual.
            <br />
            2.2. Você concorda em utilizar o conteúdo apenas para fins pessoais e não comerciais.
            <br /><br />

            <strong>3. Conta do Usuário:</strong>
            <br />
            3.1. Ao criar uma conta neste site, você é responsável por manter a confidencialidade das suas informações de login.
            <br />
            3.2. Você concorda em notificar-nos imediatamente sobre qualquer uso não autorizado da sua conta.
            <br /><br />

            <strong>4. Responsabilidades do Usuário:</strong>
            <br />
            4.1. Ao utilizar este site, você concorda em não violar leis locais, estaduais, nacionais ou internacionais.
            <br />
            4.2. Você é responsável por qualquer conteúdo postado ou atividade realizada na sua conta.
            <br /><br />

            <strong>5. Limitação de Responsabilidade:</strong>
            <br />
            5.1. Este site é fornecido "como está", sem garantias de qualquer tipo, expressas ou implícitas.
            <br />
            5.2. Não nos responsabilizamos por danos diretos, indiretos, incidentais ou consequentes resultantes do uso deste site.
            <br /><br />

            <strong>6. Modificações nos Termos:</strong>
            <br />
            6.1. Reservamo-nos o direito de modificar estes Termos e Condições a qualquer momento, notificando os usuários sobre as alterações.
            <br />
            6.2. O uso contínuo deste site após as modificações constitui aceitação dos novos Termos e Condições.
            <br /><br />

            <strong>7. Encerramento de Conta:</strong>
            <br />
            7.1. Reservamo-nos o direito de encerrar contas de usuários que violarem estes Termos e Condições.
            <br />
            7.2. O encerramento da conta pode ocorrer sem aviso prévio.
            <br /><br />
          </Text>
        </Stack>
        <HStack spacing={4} justify="center" mt={5}></HStack>
      </Box>
      <Footer />
    </>
  );
};

export default TermoCondicoes;