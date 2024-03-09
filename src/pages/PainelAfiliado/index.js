import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { Box, Button, IconButton, Image, Input, InputGroup, InputLeftAddon, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, SimpleGrid, Skeleton, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure } from '@chakra-ui/react';
import Geral from './Geral';
import axios from 'axios';
import ipApi from '../../Services/ipApi';
import headers from '../../Services/configapi';




const PainelAfiliado = () => {
    const [loading, SetLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [saldo, setSaldo] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        SetLoading(true)
        const ObterUsuarios = () => {
            const dataa = {
                tabela: 'users',
            };
            axios.post(`${ipApi}/api/banco/consultatabela`, dataa, { headers })
                .then(response => {
                    setUsers(response.data.message)
                    SetLoading(false)
                }).catch(error => {
                    console.log(error);
                })
        }
        ObterUsuarios()

        const ObterSaldoProcessamento = () => {
            const dataa = {
                tabela: 'processamentosaldo',
            };
            axios.post(`${ipApi}/api/banco/consultatabela`, dataa, { headers })
                .then(response => {
                    setSaldo(response.data.message)
                    SetLoading(false)
                }).catch(error => {
                    console.log(error);
                })
        }
        ObterSaldoProcessamento()

    }, [])


    if (users.filter(user => user.uid === localStorage.getItem('uid'))[0]?.codigoafiliado === null) {

        return (
            <>
                <Box minH={670} bgColor='green.300' display='flex' p={5} flexDirection={'column'}>
                    <Spinner />
                </Box>
            </>
        )
    }

    if (loading) {
        return (
            <>
                <Box minH={670} bgColor='green.300' display='flex' p={5} flexDirection={'column'}>
                    <Spinner />
                </Box>
            </>
        )
    }
    return (
        <>
            <Box minH={670} bgColor='green.300' display='flex' p={5} flexDirection={'column'}>
                <Button onClick={() => { navigate('/') }} m={1} w={70}>Voltar</Button>
                <Tabs width='100%'>
                    <TabList borderRadius={20} bgColor='white'>
                        <Tab>Geral</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Geral users={users} saldo={saldo} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    );
};

export default PainelAfiliado;