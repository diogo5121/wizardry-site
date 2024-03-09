import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, IconButton, Image, Input, InputAddon, InputGroup, InputLeftAddon, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stat, StatHelpText, StatLabel, StatNumber, Tab, TabList, TabPanel, TabPanels, Table, TableCaption, TableContainer, Tabs, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useClipboard, useDisclosure } from '@chakra-ui/react';
import ipApi from '../../Services/ipApi';
import axios from 'axios';
import headers from '../../Services/configapi';
import { FaCopy, FaLink } from "react-icons/fa";

const Geral = ({ users, saldo }) => {
    const [Usuario, SetUsuario] = useState([]);
    const { hasCopied, onCopy } = useClipboard();

    useEffect(() => {
        const ObterUsuario = () => {
            const dataa = {
                tabela: 'users',
                item: 'uid',
                valoritem: localStorage.getItem('uid'),
            };
            axios.post(`${ipApi}/api/banco/consultaespecifica`, dataa, { headers })
                .then(response => {
                    SetUsuario(response.data.message[0])
                }).catch(error => {
                    console.log(error);
                })
        }
        ObterUsuario()
    }, [])

    const QuantidadeIndicacoes = users.filter(user => user.referencialid === Usuario.codigoafiliado).length;
    const UsuariosIndicados = users.filter(user => user.referencialid === Usuario.codigoafiliado);

    return (
        <>
            <Box minH={670} bgColor='white' display='flex' p={5} flexDirection={'column'}>
                <InputGroup maxW={600}>
                    <InputAddon>
                        <FaLink />  Link:
                    </InputAddon>
                    <Input value={`https://wizardry.com.br/cadastro/${Usuario.codigoafiliado}`} isReadOnly />
                    <InputRightElement cursor={'pointer'} onClick={() => onCopy(`https://wizardry.com.br/cadastro/${Usuario.codigoafiliado}`)}>
                        <FaCopy />
                    </InputRightElement>
                </InputGroup>
                <Text color={'green'}>{hasCopied && 'Texto copiado com sucesso'}</Text>
                <Box m={5} border="1px" borderColor="gray.300" p={1} borderRadius="md" display='flex' flexDirection={{ base: 'column', md: 'row' }}>
                    <Stat m={5}>
                        <StatLabel>Quantidade de indicações</StatLabel>
                        <StatNumber>{QuantidadeIndicacoes}</StatNumber>
                    </Stat>
                </Box>

                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Foto</Th>
                                <Th>Username</Th>
                                <Th>Rank</Th>
                                <Th display={{ base: 'none', md: 'flex' }}>Email</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {UsuariosIndicados.map(Usuario => (
                                <Tr>
                                    <Td>
                                        <Avatar
                                            size="sm"
                                            name="Profile"
                                            src={`${ipApi}/images/${Usuario.imagemperfil}`}
                                        />
                                    </Td>
                                    <Td>{Usuario.username}</Td>
                                    <Td >{Usuario.rank}</Td>
                                    <Td display={{ base: 'none', md: 'flex' }} >{Usuario.email}</Td>
                                </Tr>
                            ))}

                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

export default Geral;