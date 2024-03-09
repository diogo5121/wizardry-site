import React, { useState } from 'react';
import { Image, InputRightElement, Text, useDisclosure } from '@chakra-ui/react';
import {
    useColorModeValue,
    chakra,
    Flex,
    HStack,
    Box,
    IconButton,
    VStack,
    CloseButton,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Avatar,
    VisuallyHidden,
} from '@chakra-ui/react';
import { AiOutlineMenu, AiFillHome, AiOutlineSearch} from 'react-icons/ai';
import OpcoesHeader from './OpcoesHeader';
import { BiPhoneCall } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import ipApi from '../../Services/ipApi';


const HeaderGlobal = () => {
    const bg = useColorModeValue("white", "gray.800");
    const mobileNav = useDisclosure();
    const navigate = useNavigate();

    const [pesquisa, setpesquisa] = useState('')

    return (
        <React.Fragment>
            <chakra.header
                bg={bg}
                w="full"
                px={{
                    base: 2,
                    sm: 4,
                }}
                py={4}
                shadow="md"
            >
                <Flex alignItems="center" justifyContent="space-between" mx="auto">
                    <HStack display="flex" spacing={3} alignItems="center">
                        <Box
                            display={{
                                base: "inline-flex",
                                md: "none",
                            }}
                            zIndex={20}

                        >
                            <IconButton
                                display={{
                                    base: "flex",
                                    md: "none",
                                }}
                                aria-label="Open menu"
                                fontSize="20px"
                                color="gray.800"
                                _dark={{
                                    color: "inherit",
                                }}
                                variant="ghost"
                                icon={<AiOutlineMenu />}
                                onClick={mobileNav.onOpen}
                            />
                            <Box
                                display={mobileNav.isOpen ? "flex" : "none"}
                                pos="fixed"
                                top={0}
                                right={0}
                                bottom={0}
                                left={0}
                                bg="rgba(0, 0, 0, 0.5)" // Cor de fundo semitransparente
                                zIndex={10}
                                onClick={mobileNav.onClose}
                            />
                            <VStack
                                pos='absolute'
                                top={0}
                                left={0}
                                right={0}
                                display={mobileNav.isOpen ? "flex" : "none"}
                                flexDirection="column"
                                p={2}
                                pb={4}
                                m={2}
                                bg={bg}
                                spacing={3}
                                rounded="sm"
                                shadow="sm"
                                position="absolute"
                                zIndex={20}
                            >
                                <CloseButton
                                    aria-label="Close menu"
                                    justifySelf="self-start"
                                    onClick={mobileNav.onClose}
                                />
                                <Button w="full" variant="ghost" leftIcon={<AiFillHome />} onClick={() => { navigate('/') }}>
                                    Home
                                </Button>
                                <Button
                                    w="full"
                                    variant="ghost"
                                    leftIcon={<BiPhoneCall />}
                                    onClick={() => { navigate('/suporte') }}
                                >
                                    Suporte
                                </Button>
                            </VStack>
                        </Box>
                        <chakra.a
                            href="/"
                            title="Choc Home Page"
                            display="flex"
                            alignItems="center"
                        >
                            <VisuallyHidden>Choc</VisuallyHidden>
                        </chakra.a>

                        <HStack
                            spacing={3}
                            display={{
                                base: "none",
                                md: "inline-flex",
                            }}
                        >
                            <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center' cursor='pointer' onClick={() => { navigate('/') }}>
                                <Image src={`${ipApi}/images/logo.jpg`} width='20px' height='20px' />
                                <Text>Wizardry</Text>
                            </Box>
                            <Button variant="ghost" leftIcon={<AiFillHome />} size="sm" onClick={() => { navigate('/') }}>
                                Home
                            </Button>
                            <Button
                                variant="ghost"
                                leftIcon={<BiPhoneCall />}
                                size="sm"
                                onClick={() => { navigate('/suporte') }}
                            >
                                Suporte
                            </Button>
                        </HStack>
                    </HStack>
                    <HStack
                        spacing={3}
                        display={mobileNav.isOpen ? "none" : "flex"}
                        alignItems="center"
                    >
                        <InputGroup>

                            <Input value={pesquisa} onChange={(e) => { setpesquisa(e.target.value) }} placeholder="Pesquisar..." />
                            <InputRightElement>
                            <InputLeftElement>
                                <IconButton
                                icon={(<AiOutlineSearch />)}
                                onClick={() => {navigate(`/pesquisa/${pesquisa}`); setpesquisa('')}}
                                color='green'
                                />
                            </InputLeftElement>
                            </InputRightElement>
                        </InputGroup>

                        <chakra.a
                            p={3}
                            color="gray.800"
                            _dark={{
                                color: "inherit",
                            }}
                            rounded="sm"
                            _hover={{
                                color: "gray.800",
                                _dark: {
                                    color: "gray.600",
                                },
                            }}
                        >

                        </chakra.a>
                        {OpcoesHeader()}

                    </HStack>
                </Flex>
            </chakra.header>
        </React.Fragment>
    );
};

export default HeaderGlobal;
