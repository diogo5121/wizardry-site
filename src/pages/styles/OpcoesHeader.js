import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import headers from '../../Services/configapi';
import ipApi from '../../Services/ipApi';
import { BsFillCameraVideoFill, BsGraphUp } from "react-icons/bs";
import { Button, Avatar, useDisclosure, IconButton, Box, VStack, useColorModeValue, VisuallyHidden, Spinner } from '@chakra-ui/react';
import { RiAdvertisementFill, RiLogoutBoxFill, RiLogoutCircleFill, RiMoneyDollarCircleFill } from "react-icons/ri";
import { AiFillBell, AiFillHome, AiFillMoneyCollect, AiFillProfile, AiOutlineInbox, AiOutlineMenu, AiOutlineShoppingCart } from 'react-icons/ai';
import { ImagemRank } from '../Utils/PegarImagemRank';



const OpcoesHeader = () => {
  const [imagemperfil, setimagemperfil] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const perfilNav = useDisclosure();
  const bg = useColorModeValue("white", "gray.800");
  const email = localStorage.getItem('email');
  const [user, setUser] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = {
          tabela: 'users',
          item: 'email',
          valoritem: email,
        };

        const response = await axios.post(`${ipApi}/api/banco/consultaespecifica`, data, { headers });
        setUser(response.data.message[0])
        setimagemperfil(response.data.message[0].imagemperfil);
      } catch (error) {
        console.error('Erro na requisição da API', error);
      } finally {
        setLoading(false);
      }
    };

    if (email && typeof email === 'string') {
      getUsers();
    } else {
      setLoading(false);
    }
  }, [email]);

  const singOUT = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("uid");
    localStorage.removeItem("token");
    window.location.reload()
  };

  if (loading) {
    return (
      <Spinner size="md" color="green.500" />
    );
  } else {
    if (email !== null && typeof email === 'string') {
      return (
        <>
          <AiFillBell size={40} />
          <Avatar
            size="sm"
            name="Profile"
            src={`${ipApi}/images/${imagemperfil}`}
          />
          <IconButton
            aria-label="Open menu"
            fontSize="20px"
            color="gray.800"
            _dark={{
              color: "inherit",
            }}
            variant="ghost"
            icon={<AiOutlineMenu />}
            onClick={perfilNav.isOpen ? perfilNav.onClose : perfilNav.onOpen}
          />
          <Box>
            <Box
              display={perfilNav.isOpen ? "flex" : "none"}
              pos="fixed"
              top={0}
              right={0}
              bottom={0}
              left={0}
              zIndex={10}
              onClick={perfilNav.onClose}
            />
            <VStack
              pos="absolute"
              right={0}
              display={perfilNav.isOpen ? "flex" : "none"}
              flexDirection="column"
              p={2}
              pb={4}
              m={2}
              mt={5}
              bg={bg}
              spacing={3}
              rounded="sm"
              shadow="sm"
              zIndex={20}

            >
              <Button w="full" variant="ghost" leftIcon={<AiFillProfile size={25} />} onClick={() => { navigate("/perfil") }}>
                Meu Perfil
              </Button>
              <Button
                w="full"
                variant="ghost"
                leftIcon={<RiMoneyDollarCircleFill size={25} />}
                onClick={() => { navigate("/saldo") }}
              >
                Saldo
              </Button>
              <Button
                w="full"
                variant="ghost"
                leftIcon={ImagemRank('rank', 30)}
                onClick={() => { navigate("/upar-conta") }}
              >
                Ranks
              </Button>
              <Button
                w="full"
                variant="ghost"
                leftIcon={<AiOutlineShoppingCart size={25} />}
                onClick={() => { navigate("/minhas-compras") }}
              >
                Minhas Compras
              </Button>
              <Button
                w="full"
                variant="ghost"
                leftIcon={<BsGraphUp size={25} />}
                onClick={() => { navigate("/minhas-vendas") }}
              >
                Minhas Vendas
              </Button>
              <Button
                w="full"
                variant="ghost"
                leftIcon={<RiAdvertisementFill size={25} />}
                onClick={() => { navigate("/meus-anuncios") }}
              >
                Meus Anuncios
              </Button>
              <Button
                w="full"
                variant="ghost"
                leftIcon={<RiLogoutCircleFill size={25} />}
                onClick={() => { singOUT() }}
              >
                Sair da conta
              </Button>
              {localStorage.getItem('uid') === process.env.REACT_APP_UID_MESTRE && (
                <>
                  <Button
                    w="full"
                    variant="ghost"
                    leftIcon={<BsGraphUp size={25} />}
                    onClick={() => { navigate('/didiadmin') }}
                  >
                    Admin
                  </Button>
                </>
              )}
              {user.codigoafiliado === null ? (
                <>
                </>
              ) : (
                <>
                  <Button
                    w="full"
                    variant="ghost"
                    leftIcon={<BsGraphUp size={25} />}
                    onClick={() => { navigate('/painelafiliado') }}
                  >
                    Painel Afiliado
                  </Button>
                </>
              )}

            </VStack>
          </Box>

        </>


      );
    } else {
      return (
        <>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => { navigate("/login") }}
          >
            Login
          </Button>
          <Button colorScheme="green" size="sm" p={5} onClick={() => { navigate("/cadastro") }}>
            Vender
          </Button>
        </>

      );
    }
  }
};
export default OpcoesHeader;