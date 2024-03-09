import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { Box, Button, IconButton, Image, Input, InputGroup, InputLeftAddon, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stat, StatHelpText, StatLabel, StatNumber, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure } from '@chakra-ui/react';




const Geral = ({users, saldo}) => {

    useEffect(() => {
    }, [])

    const SaldoNaPlataforma = () => {
        if (!Array.isArray(users)) {
            console.error('Error: users is not an array');
            return 0; // or handle it in a way that makes sense for your application
        }

        const soma = users.reduce((acumulador, user) => acumulador + parseFloat(user.valor), 0);
        return soma;
    };

    const ProcessamentoSaldo = () => {
        if (!Array.isArray(saldo)) {
            console.error('Error: users is not an array');
            return 0; // or handle it in a way that makes sense for your application
        }
        const saldoFiltrado = saldo.filter(saldos => saldos.status === 'processando')
        const soma = saldoFiltrado.reduce((acumulador, saldos) => acumulador + parseFloat(saldos.valor), 0);
        return soma;
    };


    return (
        <>
            <Box minH={670} bgColor='white' display='flex' p={5} flexDirection={'column'}>
                <Box m={5} border="1px" borderColor="gray.300" p={1} borderRadius="md" display='flex' flexDirection={{base: 'column', md: 'row'}}>
                    <Stat m={5}>
                        <StatLabel>Saldo para saque</StatLabel>
                        <StatNumber>R$ {SaldoNaPlataforma()}</StatNumber>
                    </Stat>
                    <Stat m={5}>
                        <StatLabel>Saldo em processamento</StatLabel>
                        <StatNumber>R$ {ProcessamentoSaldo()}</StatNumber>
                    </Stat>
                    <Stat m={5}>
                        <StatLabel>Total de saque Pendente</StatLabel>
                        <StatNumber>R$ 0.00</StatNumber>
                    </Stat>
                    <Stat m={5}>
                        <StatLabel>Vendas nessa mês</StatLabel>
                        <StatNumber>0</StatNumber>
                    </Stat>
                </Box>
            </Box>
        </>
    );
};

export default Geral;