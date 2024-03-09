import React, { useState, useEffect } from 'react';
import axios from 'axios';
import headers from '../../Services/configapi';
import { Box, Button, ButtonGroup, FormControl, GridItem, IconButton, Input, Skeleton, Td, Text, Tr } from '@chakra-ui/react';
import ipApi from '../../Services/ipApi';
import { BsCheck, BsInfo, BsTrash } from 'react-icons/bs';
import { GiWalkieTalkie } from 'react-icons/gi';
import { FaWalking } from 'react-icons/fa';
import { AiFillAlert, AiFillEdit } from 'react-icons/ai';
import { BiChat, BiCloset, BiPhone } from 'react-icons/bi';
import { SlActionUndo } from 'react-icons/sl';

const ExcluirVendas = (VendaInfo, setVendaNav, InfoComprador) => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchData = async () => {
        };

        fetchData();
    }, []);

    const validarInput = () => {
        const UsernameValido = username == InfoComprador.username

        return !(UsernameValido)
    }

    return (
        <Box
            bg="#edf3f8"
            _dark={{
                bg: "#111",
            }}
            p={5}
            borderRadius={20}
            minW={100}
        >
            <Box alignItems="center" flexDirection="column" display="flex" >
                <Text>EXCLUIR VENDA!</Text>
            </Box>
            <Box alignItems="center" flexDirection="column" display="flex" >
                <Text>ID DA VENDA: {VendaInfo.id}</Text>
            </Box>
            <Box alignItems="center" flexDirection="column" display="flex" mt={5} >
                <Text fontWeight={800}>Informações do comprador</Text>
            </Box>
            <FormControl as={GridItem} colSpan={[6, 6, null, 2]} mt={2}>
                <Text >Nome: {InfoComprador.name}</Text>
                <Text >Username: {InfoComprador.username}</Text>
                <Text>Rank: {InfoComprador.rank}</Text>
            </FormControl>

            <Box alignItems="center" flexDirection="column" display="flex" mt={15} >
                <Text fontWeight={800}>Informações da compra</Text>
            </Box>
            <FormControl as={GridItem} colSpan={[6, 6, null, 2]} mt={2}>
                <Text>Id do Anuncio: {VendaInfo.idanuncio}</Text>
                <Text>Titulo: {VendaInfo.titulo}</Text>
                <Text>Quantidade: {VendaInfo.quantidadedacompra} Un.</Text>
                <Text>Status de Compra: {VendaInfo.statusdacompra}</Text>
                <Text>Valor Total: R$ {VendaInfo.valordacompra}</Text>
            </FormControl>
            <Box alignItems="center" flexDirection="column" display="flex" mt={10} maxWidth={300}>
                <Text fontWeight={800}>Confirme o username do comprador para cancelar a compra: {InfoComprador.username}</Text>
                <Input placeholder='Username' onChange={(e) => {setUsername(e.target.value)}}/>
            </Box>
            <ButtonGroup mt={10}>
                <Button
                    m={3}
                    type="submit"
                    colorScheme="green"
                    _focus={{
                        shadow: "",
                    }}
                    fontWeight="md"
                    onClick={() => { setVendaNav(false) }}
                >
                    <SlActionUndo />Voltar
                </Button>
                <Button
                    m={3}
                    type="submit"
                    colorScheme="red"
                    _focus={{
                        shadow: "",
                    }}
                    fontWeight="md"
                    isDisabled={validarInput()}
                >
                    <BiCloset />Excluir
                </Button>
            </ButtonGroup>

        </Box>
    );
};

export default ExcluirVendas;
