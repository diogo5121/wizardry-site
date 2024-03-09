import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Box, Stack, Flex, Image, HStack, Divider, VStack, Text, Icon, Link as ChakraLink } from '@chakra-ui/react'; // Adicione estas importações

// Importe os ícones específicos que você está utilizando, por exemplo:
import { FiTwitter } from 'react-icons/fi';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { GrInstagram } from 'react-icons/gr';
import { BsYoutube } from 'react-icons/bs';

const FooterLink = styled(Link)`
  color: #424242;
  margin: 5px 0;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;


const Footer = () => {
  return (
    <Box
      bg="white"
      _dark={{
        bg: "gray.600",
      }}
      shadow="md"
    >
      <Stack
        direction={{
          base: "column",
          lg: "row",
        }}
        w="full"
        justify="space-between"
        p={10}
      >
        <Flex justify="center">
        </Flex>
        <HStack
          alignItems="start"
          flex={1}
          justify="space-around"
          fontSize={{
            base: "12px",
            md: "16px",
          }}
          color="gray.800"
          _dark={{
            color: "white",
          }}
          textAlign={{
            base: "center",
            md: "left",
          }}
        >
          <Flex justify="start" direction="column">
            <Text fontSize={16} color={'green.700'} fontWeight={700} mb={5}>Como Funciona</Text>
            <FooterLink to="/como-funciona">Como Funciona</FooterLink>
            <ChakraLink href="https://www.youtube.com/@wizardry_tutorial" target="_blank" rel="noopener noreferrer">
              <FooterLink>Tutoriais Youtube</FooterLink>
            </ChakraLink>
            <FooterLink to="/tarifa-prazos">Tarifas e Prazos</FooterLink>
            <FooterLink to="/formas-pagamento">Formas de pagamento</FooterLink>
          </Flex>
          <Flex justify="start" direction="column">
            <Text fontSize={16} color={'green.700'} fontWeight={700} mb={5}>Minha Conta</Text>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/perfil">Meu perfil</FooterLink>
            <FooterLink to="/Suporte">Suporte</FooterLink>
          </Flex>
        </HStack>
        <HStack
          alignItems="start"
          flex={1}
          justify="space-around"
          fontSize={{
            base: "12px",
            md: "16px",
          }}
          color="gray.800"
          _dark={{
            color: "white",
          }}
          textAlign={{
            base: "center",
            md: "left",
          }}
        >
          <Flex justify="start" direction="column">
            <Text fontSize={16} color={'green.700'} fontWeight={700} mb={5}>Informações</Text>
            <FooterLink to="/politica-reembolso">Política de Reembolso</FooterLink>
            <FooterLink to="/politica-privacidade">Política de Privacidade</FooterLink>
            <FooterLink to="/termos-condicoes">Termos e Condições de Uso</FooterLink>
          </Flex>
        </HStack>
      </Stack>
      <Divider
        w="95%"
        mx="auto"
        color="gray.600"
        _dark={{
          color: "#F9FAFB",
        }}
        h="3.5px"
      />
      <VStack py={3}>
        <HStack justify="center">
          <ChakraLink href="https://www.instagram.com/wizardry_oficial/" target="_blank" rel="noopener noreferrer">
            <Icon
              color="gray.800"
              _dark={{
                color: "white",
              }}
              h="20px"
              w="20px"
              as={GrInstagram}
            />
          </ChakraLink>
          <ChakraLink href="https://www.youtube.com/@wizardry_tutorial" target="_blank" rel="noopener noreferrer">
            <Icon
              color="gray.800"
              _dark={{
                color: "white",
              }}
              h="20px"
              w="20px"
              as={BsYoutube}
            />
          </ChakraLink>
        </HStack>

        <Text
          color="gray.800"
          textAlign="center"
          fontSize="smaller"
          _dark={{
            color: "white",
          }}
        >
          &copy;2024 Vexa Company. Todos os direitos reservados.
        </Text>
      </VStack>
    </Box>

  );
};

export default Footer;