import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o `useParams` daqui
import Footer from '../styles/footer';
import HeaderGlobal from '../styles/headerGlobal';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, ButtonGroup, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import { BiPhoneCall } from 'react-icons/bi';
import { BsMailbox, BsWhatsapp } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import axios from 'axios';
import ipApi from '../../Services/ipApi';
import headers from '../../Services/configapi';

const Suporte = () => {
    const [numero, setnumero] = useState(0)
    const [loading, setLoading] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()


    useEffect(() => {
        setLoading(true)
        const data = {
            tabela: 'suporte',
        };
        axios.post(`${ipApi}/api/banco/consultatabela`, data, { headers })
            .then(response => {
                setnumero(response.data.message[0])
                setLoading(false)


            })
            .catch(error => {
            });
    }, []);




    const handleWhatsappClick = () => {
        const whatsappLink = `https://api.whatsapp.com/send?phone=${numero.numero}&text=Gostaria de tirar uma duvida`;

        window.location.href = whatsappLink;
    };




    return (
        <>
            <HeaderGlobal />
            <Box Box display='flex' bg="#edf3f8" flexDirection='column' justifyContent='center' alignItems='center' m={2} shadow="lg" borderRadius={20}>
                <Box display='flex' bg="#edf3f8" flexDirection={{ base: 'column', md: 'row' }} justifyContent='space-between' borderRadius={20}>
                    <Box alignItems='center' display='flex' flexDirection='row' m={1} marginLeft={{ base: 0, md: 20 }}>
                        <BiPhoneCall size={70} />
                        <Text fontWeight={700} fontSize={30} marginLeft={10}>Suporte</Text>
                    </Box>
                </Box>
            </Box>
            <Box Box display='flex' bg="#edf3f8" flexDirection='column' justifyContent='center' alignItems='center' m={2} shadow="lg" borderRadius={20}>

                <Box alignItems='center' display='flex' flexDirection='column' m={1} marginLeft={{ base: 0, md: 0 }} mt={10} justifyContent='center' border="1px" borderColor="gray.300" p={4} borderRadius="md">
                    <Text fontSize={25} fontWeight={700}>Horario de atendimento:</Text>
                    <Text fontSize={20} mt={5}>Segunda a sexta: 08:00 até 18:00</Text>
                    <Text fontSize={20} >Sabado: 08:00 até 12:00</Text>
                </Box>
                <Text fontWeight={700} fontSize={30} mt={10}>Escolha uma forma:</Text>
                {loading ? (<Spinner />) : (
                    <Box display='flex' bg="#edf3f8" flexDirection={{ base: 'column', md: 'row' }} justifyContent='space-between' borderRadius={20} mt={{ base: 5, md: 20 }}>
                        <Box alignItems='center' display='flex' flexDirection='column' m={1} marginLeft={{ base: 0, md: 0 }} justifyContent='center'>
                            <ButtonGroup>
                                <Button
                                    m={3}
                                    type="submit"
                                    colorScheme="green"
                                    _focus={{
                                        shadow: "",
                                    }}
                                    fontWeight="md"
                                    size='lg'
                                    onClick={onOpen}
                                >
                                    <MdEmail />Email
                                </Button>
                            </ButtonGroup>
                            <Text fontSize={15}>Em até 1 dia útil.</Text>
                        </Box>
                        <Box alignItems='center' display='flex' flexDirection='column' m={1} marginLeft={{ base: 0, md: 20 }} justifyContent='center' mt={{ base: 5, md: 0 }}>
                            <ButtonGroup>
                                <Button
                                    m={3}
                                    type="submit"
                                    colorScheme="green"
                                    _focus={{
                                        shadow: "",
                                    }}
                                    fontWeight="md"
                                    size='lg'
                                    onClick={() => { handleWhatsappClick() }}
                                >
                                    <BsWhatsapp /> Whatsapp
                                </Button>
                            </ButtonGroup>
                            <Text fontSize={15}>Em até 10 minutos dentro do horario de atendimento.</Text>
                        </Box>
                    </Box>
                )
                }

            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Entre em contado pelo nosso email:</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Email: {numero.email}</Text>
                        <Text fontSize={15} mt={3}>Respostae em até 1 dia útil.</Text>
                        <Box alignItems='center' display='flex' flexDirection='column' m={1} marginLeft={{ base: 0, md: 0 }} mt={10} justifyContent='center' border="1px" borderColor="gray.300" p={4} borderRadius="md">
                            <Text fontSize={25} fontWeight={700}>Horario de atendimento:</Text>
                            <Text fontSize={20} mt={5}>Segunda a sexta: 08:00 até 18:00</Text>
                            <Text fontSize={20} >Sabado: 08:00 até 12:00</Text>
                        </Box>
                    </ModalBody>


                    <ModalFooter>
                        <Button colorScheme='green' mr={3} onClick={onClose}>
                            Fechar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Footer />
        </>
    );
};

export default Suporte;
