import React, { useEffect, useState } from 'react';
import { validarEmail, validarNome, validarSenha, validarTelefone } from '../Utils/validadores';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'
import headers from '../../Services/configapi'
import ipApi from '../../Services/ipApi';
import InputMask from 'react-input-mask';
import { Box, Button, ButtonGroup, Flex, InputGroup, InputRightAddon, Stack, Text, Input, InputAddon, Link, Checkbox } from '@chakra-ui/react';
import { BsPeople } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { BiLock, BiPhone } from 'react-icons/bi';
import { AiFillSnippets } from 'react-icons/ai';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SeuComponente from '../CadastroNovo/InputMas';


const CadastroNovo = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState([]);
    const [allusers, setallusers] = useState([])
    const [email, setemail] = useState('')
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [confirmarSenha, setconfirmarSenha] = useState('')
    const [name, setname] = useState('')
    const [telefone, setTelefone] = useState('')
    const [mostrarsenha, setMostrarSenha] = useState('password')
    const [indicacao, setIndicacao] = useState('')
    const [concordoTermos, setConcordoTermos] = useState(false);
    const navigate = useNavigate()


    useEffect(() => {
        setLoading(true)
        const getUsers = async () => {
            const data = {
                tabela: 'users',
            };
            axios.post(`${ipApi}/api/banco/consultatabela`, data, { headers })
                .then(response => {
                    setallusers(response.data.message)
                    setLoading(false)
                })
                .catch(error => {
                });

        }
        getUsers()
    }, []);


    const singUp = (e) => {
        setLoading(true)
        console.log(telefone)
        //Jogar firebase

        const data = {
            email: email,
            password: password,
        };
        axios.post(`${ipApi}/api/cadastro`, data, { headers })
            .then(response => {
                const uid = response.data.uid
                const data = {
                    name: name,
                    username: username,
                    pix: '0',
                    uid: uid,
                    email: email,
                    numero: telefone,
                    referencialid: indicacao,
                };
                axios.post(`${ipApi}/api/banco/createuser`, data, { headers })
                    .then(response => {


                        navigate('/login')
                        setLoading(false)


                    })
                    .catch(error => {
                    });



            })
            .catch(error => {
            });


    }

    const sanitizeInput = (inputValue) => {
        return inputValue.replace(/['"{}()´`]/g, '');
    };

    const validarInput = () => {
        //Tem que voltar true se estiver certo
        //Nome
        const NomeValido = name.length > 2

        //Username
        const UsernameValido = username.length > 2
        const UsernameBanco = allusers.filter(user => user.username === username).length === 0
        const UsernameSemEspaco = !username.includes(' ');

        //Email
        const EmailValido = validarEmail(email)
        const EmailBanco = allusers.filter(user => user.email === email).length === 0

        //NumeroTelefone
        const TelefoneValido = telefone.length > 9
        const TelefoneBanco = allusers.filter(user => user.telefone === telefone).length === 0

        //senhas
        const SenhaValida = password.length > 6
        const SenhaConfirmarValida = password === confirmarSenha

        //codigoafiliado
        const codigoafiliadoValido = allusers.filter(user => user.codigoafiliado === indicacao).length === 1

        return NomeValido && UsernameValido && EmailValido && UsernameBanco && EmailBanco && TelefoneValido && TelefoneBanco && SenhaValida && SenhaConfirmarValida && UsernameSemEspaco && concordoTermos && codigoafiliadoValido
    }

    return (
        <>
            <Box h={{ base: '130vh', md: '140vh' }} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Box display={'flex'} flexDirection={'column'} bg="#edf3f8" borderRadius={20} p={7} justifyContent={'center'} alignItems={'center'}>
                    <Text mb={3} fontSize={25} fontWeight={700} color={'green.400'}>Realizar Cadastro - Wizardry</Text>
                    <Stack spacing={2} w={{ base: 300, md: 600 }}>
                        <InputGroup size='sm' display={'flex'} flexDirection={'column'} m={1} shadow={'sm'}>
                            <InputAddon>
                                <BsPeople size={20} />< Text ml={2} fontSize={15} fontWeight={700}>Nome:</Text>
                            </InputAddon>
                            <Input placeholder='Nome Completo' size={'lg'} type='text' onChange={(e) => { setname(sanitizeInput(e.target.value)) }} />
                        </InputGroup>
                        <InputGroup size='sm' display={'flex'} flexDirection={'column'} m={1} shadow={'sm'}>
                            <InputAddon>
                                <BsPeople size={20} />< Text ml={2} fontSize={15} fontWeight={700}>Username:</Text>
                            </InputAddon>
                            <Input placeholder='Username' size={'lg'} type='text' onChange={(e) => { setusername(sanitizeInput(e.target.value.toLocaleLowerCase())) }} />
                            {allusers.filter(user => user.username === username).length === 1 && (
                                <Text color={'red'}>Esse username já esta em uso</Text>
                            )}
                            {username.includes(' ') && (
                                <Text color={'red'}>O username não pode conter espaços</Text>
                            )}
                        </InputGroup>
                        <InputGroup size='sm' display={'flex'} flexDirection={'column'} m={1} shadow={'sm'}>
                            <InputAddon>
                                <MdEmail size={20} />< Text ml={2} fontSize={15} fontWeight={700}>Email:</Text>
                            </InputAddon>
                            <Input placeholder='Email' size={'lg'} type='text' onChange={(e) => { setemail(sanitizeInput(e.target.value)) }} />
                            {allusers.filter(user => user.email === email).length === 1 && (
                                <Text color={'red'}>Esse email já está em uso</Text>
                            )}
                        </InputGroup>
                        <InputGroup size='sm' display={'flex'} flexDirection={'column'} m={1} shadow={'sm'}>
                            <InputAddon>
                                <BiPhone size={20} />< Text ml={2} fontSize={15} fontWeight={700}>Numero de telefone:</Text>
                            </InputAddon>
                            <SeuComponente handleChange={setTelefone} />
                            {allusers.filter(user => user.telefone === telefone).length === 1 && (
                                <Text color={'red'}>Esse telefone ja está em uso</Text>
                            )}
                        </InputGroup>
                        <InputGroup size='sm' display={'flex'} flexDirection={'column'} m={1} shadow={'sm'}>
                            <InputAddon display={'flex'} justifyContent={'space-between'}>
                                <Box display={'flex'} flexDirection={'row'}>
                                    <BiLock size={20} />< Text ml={2} fontSize={15} fontWeight={700}>Senha:</Text>
                                </Box>
                                {mostrarsenha === 'password' ? (
                                    <><FaEyeSlash size={20} cursor={'pointer'} onClick={() => { setMostrarSenha('text') }} /></>
                                ) : (
                                    <><FaEye size={20} cursor={'pointer'} onClick={() => { setMostrarSenha('password') }} /></>
                                )}

                            </InputAddon>
                            <Input placeholder='Senha' type={mostrarsenha} size={'lg'} onChange={(e) => { setpassword(e.target.value) }} />
                        </InputGroup>
                        <InputGroup size='sm' display={'flex'} flexDirection={'column'} m={1} shadow={'sm'}>
                            <InputAddon>
                                <BiLock size={20} />< Text ml={2} fontSize={15} fontWeight={700}>Confirmar Senha:</Text>
                            </InputAddon>
                            <Input placeholder='Confirmar senha' size={'lg'} type={mostrarsenha} onChange={(e) => { setconfirmarSenha(e.target.value) }} />
                        </InputGroup>
                        <InputGroup size='sm' display={'flex'} flexDirection={'column'} m={1} shadow={'sm'}>
                            <InputAddon>
                                <AiFillSnippets size={20} />< Text ml={2} fontSize={15} fontWeight={700}>Codigo de indicação:</Text>
                            </InputAddon>
                            <Input placeholder='(Opcional)' size={'lg'} type='text' onChange={(e) => { setIndicacao(sanitizeInput(e.target.value)); console.log(indicacao) }} />
                            {allusers.filter(user => user.codigoafiliado === indicacao).length === 0 && indicacao.length > 0 && (
                                <Text color={'red'}>Esse codigo de indicação não existe</Text>
                            )}
                        </InputGroup>
                        
                        <Box mt={4} display={'flex'} flexDirection={'row'}>
                        <Checkbox onChange={(e) => setConcordoTermos(e.target.checked)} size={'lg'} borderColor={'green.700'}></Checkbox><Link ml={2} color={'green.700'} textDecoration={'underline'} onClick={() => { navigate('/termos-condicoes') }}>Concordo com os Termos e Condições de Uso </Link><Text w={10} color={'red'}>*</Text>
                        </Box>
                    </Stack>
                    <ButtonGroup mt={5} display={'flex'} flexDirection={'column'}>
                        {!validarInput() && (
                            <Text color={'gray.500'}>Complete o cadastro</Text>
                        )}
                        <Button
                            colorScheme='green'
                            isDisabled={!validarInput()}
                            onClick={() => { singUp() }}
                            isLoading={loading}
                        >
                            Cadastrar
                        </Button>
                    </ButtonGroup>
                    <Box mt={4} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'row'}>
                        <Text>Já possui conta?</Text><Link ml={2} color={'green.700'} textDecoration={'underline'} onClick={() => { navigate('/login') }}>Entrar</Link>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default CadastroNovo;
