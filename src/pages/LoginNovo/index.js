import React, { useEffect, useState } from 'react';
import { validarEmail, validarSenha } from '../Utils/validadores';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'
import headers from '../../Services/configapi'
import ipApi from '../../Services/ipApi';
import { Box, Button, ButtonGroup, Input, InputAddon, InputGroup, Link, Stack, Text } from '@chakra-ui/react';
import { MdEmail } from 'react-icons/md';
import { BiLock } from 'react-icons/bi';

const LoginNovo = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState([]);
    const email = form.email
    const password = form.password
    const navigate = useNavigate()
    const [Error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem('uid') === null) {

            } else {
                navigate("/")
            }
        };

        fetchData();
    }, []);



    const singIn = (e) => {
        setLoading(true)

        const data = {
            email: email,
            password: password,
        };

        axios.post(`${ipApi}/api/login`, data, { headers })
            .then(response => {
                if (response.sucess = true) {
                    localStorage.setItem('email', email)
                    localStorage.setItem('uid', response.data.uid)
                    localStorage.setItem('token', response.data.token)
                    window.history.back();
                    window.location.reload();
                    setLoading(false)
                } else {
                    setError('Email ou senha icorretos')
                    setLoading(false)
                }
            })
            .catch(error => {
                setError('Email ou senha incorretos')
                console.log(error)
                setLoading(false)
            });

    }

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const validarInput = () => {
        return validarEmail(form.email) && validarSenha(form.password)
    }
    const Home = (e) => {
        e.preventDefault();
        navigate("/")
    }

    return (
        <Box h={{ base: '100vh', md: '100vh' }} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Box display={'flex'} flexDirection={'column'} bg="#edf3f8" borderRadius={20} p={7} justifyContent={'center'} alignItems={'center'}>
                <Text mb={3} fontSize={25} fontWeight={700} color={'green.400'}>Login</Text>
                <Stack spacing={2} w={{ base: 300, md: 600 }}>
                    <InputGroup size='sm' display={'flex'} flexDirection={'column'} m={1} shadow={'sm'}>
                        <InputAddon>
                            <MdEmail size={20} />< Text ml={2} fontSize={15} fontWeight={700}>Email:</Text>
                        </InputAddon>
                        <Input 
                        name='email' 
                        borderColor={'gray.700'} 
                        placeholder='Email' 
                        size={'lg'} 
                        type='text' 
                        onChange={handleChange} 
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                singIn();
                            }
                        }}
                        />
                    </InputGroup>
                    <InputGroup size='sm' display={'flex'} flexDirection={'column'} m={1} shadow={'sm'}>
                        <InputAddon>
                            <BiLock size={20} />< Text ml={2} fontSize={15} fontWeight={700}>Senha:</Text>
                        </InputAddon>
                        <Input 
                        name='password' 
                        borderColor={'gray.700'} 
                        placeholder='Senha' 
                        size={'lg'} 
                        type='password' 
                        onChange={handleChange} 
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                singIn();
                            }
                        }}
                        />
                    </InputGroup>
                </Stack>
                {Error && <p style={{ color: 'red' }}>{Error}</p>}
                <ButtonGroup mt={5} display={'flex'} flexDirection={'row'}>
                    <Button
                        colorScheme='red'
                        isLoading={loading}
                        m={3}
                        onClick={() => { window.history.back() }}
                    >
                        Voltar
                    </Button>
                    <Button
                        colorScheme='green'
                        isLoading={loading}
                        m={3}
                        onClick={() => { singIn() }}
                        
                    >
                        Entrar
                    </Button>
                </ButtonGroup>
                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'row'}>
                    <Text>Não possui conta?</Text><Link ml={2} color={'green.700'} textDecoration={'underline'} onClick={() => { navigate('/cadastro') }}>Cadastre-se</Link>
                </Box>
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    flexDirection={'row'}
                    >
                    <Text>Esqueceu a senha?</Text><Link ml={2} color={'green.700'} textDecoration={'underline'} onClick={() => { navigate('/recuperar-senha') }}>Clique aqui</Link>
                </Box>
            </Box>
        </Box>
    );
}

export default LoginNovo;
