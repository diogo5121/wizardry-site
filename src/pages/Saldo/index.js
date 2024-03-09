import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Flex, Spacer, VStack, Text, IconButton} from "@chakra-ui/react";
import { FaBars } from 'react-icons/fa';
import {
  Icon,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react';

import ipApi from '../../Services/ipApi';
import Footer from '../styles/footer';
import HeaderGlobal from '../styles/headerGlobal';
import { Container } from './style';
import headers from '../../Services/configapi';




const Saldo = () => {
    const [username, setusername] = useState([])
    const [nomeCompleto, setNomeCompleto] = useState([])
    const [valor, setValor] = useState([])
    const [numero, setnumero] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getUsers = async () => {
            const data = {
                tabela: 'users',
                item: 'email',
                valoritem: localStorage.getItem('email'),
            };
            axios.post(`${ipApi}/api/banco/consultaespecifica`, data, { headers })
                .then(response => {
                    if (response.sucess = true) {
                        setValor(response.data.message[0].valor)
                        setnumero(response.data.message[0].telefone)
                        setusername(response.data.message[0].username)
                        setNomeCompleto(response.data.message[0].name)
                    } else {
                        alert('Email ou senha icorretos')
                    }
                })
                .catch(error => {
                    alert('Email ou senha incorretos')
                });

        }
        getUsers()
    })

    return (
        <Container>
            <HeaderGlobal />
            <Footer />
        </Container>
    );
}

export default Saldo;
