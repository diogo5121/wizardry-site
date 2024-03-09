import React, { useEffect, useState } from 'react';
import ipApi from '../../Services/ipApi';
import { Box, Button, ButtonGroup, FormControl, FormHelperText, FormLabel, GridItem, Image, Input, InputGroup, InputLeftElement, Select, Spinner, Text } from '@chakra-ui/react';
import { SlActionUndo } from 'react-icons/sl';
import { BiMoneyWithdraw } from 'react-icons/bi';
import axios from 'axios';
import headers from '../../Services/configapi'
import { emailSaque, emailSaqueTitulo } from '../../Services/emails';





const MenuSaque = (setNav, usuarioInfo) => {
  const [tipochave, setTipichave] = useState('semnada')
  const [ValidarChave, setValidarChave] = useState(true)
  const [ValorDigitado, setValorDigitado] = useState(0)
  const [ValorLiquido, setValorLiquido] = useState(0)
  const [inputDigitado, setInputDigitado] = useState('')
  const [loading, setLoading] = useState(false)
  const [dataAtual, setdataAtual] = useState(false)
  const [taxa, setTaxa] = useState(2.00)
  const [chavepix, setchavepix] = useState('')

  useEffect(() => {
    const dataAtual = new Date();

    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Mês é base 0
    const ano = dataAtual.getFullYear();

    const horas = String(dataAtual.getHours()).padStart(2, '0');
    const minutos = String(dataAtual.getMinutes()).padStart(2, '0');

    const dataFormatada = `${dia}/${mes}/${ano} ${horas}:${minutos}`;
    console.log(dataFormatada)

    setdataAtual(dataFormatada)

    const data = {
      tabela: 'users',
      item: 'uid',
      valoritem: localStorage.getItem('uid'),
    };

    axios.post(`${ipApi}/api/banco/consultaespecifica`, data, { headers })
      .then(response => {
        const data = {
          tabela: 'ranks',
          item: 'rank',
          valoritem: response.data.message[0].rank,
        };

        axios.post(`${ipApi}/api/banco/consultaespecifica`, data, { headers })
          .then(response => {
            setTaxa(parseFloat(response.data.message[0].taxa_saque))
          })
          .catch(error => {
            console.log(error)
          });
      })
      .catch(error => {
        console.log(error)
      });

  }, [])


  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '') return false;

    if (
      cpf.length !== 11 ||
      cpf === "00000000000" ||
      cpf === "11111111111" ||
      cpf === "22222222222" ||
      cpf === "33333333333" ||
      cpf === "44444444444" ||
      cpf === "55555555555" ||
      cpf === "66666666666" ||
      cpf === "77777777777" ||
      cpf === "88888888888" ||
      cpf === "99999999999"
    ) {
      return false;
    }

    // Valida 1o digito
    let add = 0;
    for (let i = 0; i < 9; i++) {
      add += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
      rev = 0;
    }
    if (rev !== parseInt(cpf.charAt(9))) {
      return false;
    }

    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++) {
      add += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
      rev = 0;
    }
    if (rev !== parseInt(cpf.charAt(10))) {
      return false;
    }

    return true;
  };
  const validarEmail = (email) => {
    return email?.toString().includes('@') && email?.toString().includes('.');
  };
  const validarTelefone = (telefone) => {
    return telefone?.toString().length >= 8
  }
  const validarAleatoria = (Aleatoria) => {
    return Aleatoria?.toString().length >= 31
  }

  const ValidarInput = (e) => {

    if (tipochave == 'email') {
      setValidarChave(!(validarEmail(e)))
      setchavepix(e)
    }
    if (tipochave == 'cpf') {
      setValidarChave(!(validarCPF(e)))
      setchavepix(e)
    }
    if (tipochave == 'numero') {
      setValidarChave(!(validarTelefone(e)))
      setchavepix(e)
    }
    if (tipochave == 'aleatoria') {
      setValidarChave(!(validarAleatoria(e)))
      setchavepix(e)
    }
  }

  const sanitizeInput = (inputValue) => {
    // Substitua as aspas simples, duplas, chaves e parênteses por espaços vazios
    return inputValue.replace(/['"{}()´]/g, '');
  };

  const RealizarSaque = () => {
    setLoading(true)
    const soma = parseFloat(usuarioInfo.valor) - ValorDigitado
    const somaFormulada = soma.toFixed(2)

    const SaldoAReceber = ValorDigitado - taxa
    const SaldoAReceberFormulado = SaldoAReceber.toFixed(2)

    console.log(somaFormulada, SaldoAReceberFormulado)

    const dataa = {
      tabela: 'users',
      item: 'valor',
      valoritem: somaFormulada,
      condicao: 'uid',
      valorcondicao: localStorage.getItem('uid'),
    };

    axios.post(`${ipApi}/api/banco/update`, dataa, { headers })
      .then(response => {

        const data = {
          uid: localStorage.getItem('uid'),
          chavepix: sanitizeInput(chavepix),
          tipochave: tipochave,
          cpf: '123456',
          valor: SaldoAReceberFormulado,
          status: 'pendente',
          taxa: taxa,
        };


        axios.post(`${ipApi}/api/banco/criarsaque`, data, { headers })
          .then(response => {

            const mail = {
              email: usuarioInfo.email,
              titulo: emailSaqueTitulo,
              conteudo: emailSaque(usuarioInfo.username, dataAtual, SaldoAReceberFormulado, chavepix, usuarioInfo.email),

            };

            axios.post(`${ipApi}/api/email`, mail, { headers })
              .then(response => {
                window.location.reload()
              })
              .catch(error => {
                console.log('Não foi possivel realizar essa transação')
              })
          })
          .catch(error => {
            console.log('Não foi possivel realizar essa transação')
          })

      })
      .catch(error => {
        console.log('Não foi possivel realizar essa transação')
      })

  }


  return (
    <>
      <Box bgColor='green.400' m={50} borderRadius={20} p={2}>
        <Text fontWeight={800} fontSize={20} color='white'>Saque</Text>
      </Box>
      <FormControl >
        <FormLabel>Valor:</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            color='green.300'
            fontSize='1.2em'
          >
            R$
          </InputLeftElement>
          <Input placeholder='Digite o valor' type='number' onChange={(e) => { setValorDigitado(e.target.value) }} />
        </InputGroup>
        <FormHelperText>Digite um valor entre R$ {taxa} até R$ {usuarioInfo.valor}</FormHelperText>
        {ValorDigitado > parseFloat(usuarioInfo.valor) && (
          <Text color='red'>Digite um valor entre R$ {taxa} até R$ {usuarioInfo.valor}</Text>
        )}
        {(ValorDigitado > 0.00000001 && ValorDigitado < taxa) && (
          <Text color='red'>Digite um valor entre R$ {taxa} até R$ {usuarioInfo.valor}</Text>
        )}

      </FormControl>
      <FormControl>
        <FormLabel>Tipo da chave pix</FormLabel>
        <Select value={tipochave} placeholder='Selecione' onChange={(e) => { setTipichave(e.target.value) }}>
          <option value='numero'>Celular</option>
          <option value='email'>E-mail</option>
          <option value='cpf'>Cpf</option>
          <option value='aleatoria'>Aleatoria</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Chave Pix</FormLabel>
        <Input type='email' onChange={(e) => { ValidarInput(e.target.value); setInputDigitado(e.target.value.length) }} />
        {inputDigitado > 0 && ValidarChave && tipochave === 'email' && (
          <Text color='red'>Você tem que digitar um e-mail válido</Text>
        )}
        {inputDigitado > 0 && ValidarChave && tipochave === 'cpf' && (
          <Text color='red'>Você tem que digitar um CPF válido</Text>
        )}
        {inputDigitado > 0 && ValidarChave && tipochave === 'numero' && (
          <Text color='red'>Você tem que digitar um número de telefone válido</Text>
        )}
        {inputDigitado > 0 && ValidarChave && tipochave === 'aleatoria' && (
          <Text color='red'>Você tem que digitar uma chave válida</Text>
        )}
      </FormControl>
      <FormControl as={GridItem} colSpan={[6, 6, null, 2]} mt={2}>

        <Text m={1} mt={4}>Taxa de saque: R$ {taxa}</Text>

      </FormControl>

      <ButtonGroup>

        <Button
          m={3}
          type="submit"
          colorScheme="red"
          _focus={{
            shadow: "",
          }}
          fontWeight="md"
          onClick={() => { setNav(false) }}
        >
          <SlActionUndo />Voltar
        </Button>
        {loading ? (
          <Button
            m={3}
            type="submit"
            colorScheme="green"
            _focus={{
              shadow: "",
            }}
            fontWeight="md"
            isDisabled={true}
          >
            <Spinner />
          </Button>
        ) : (
          <Button
            m={3}
            type="submit"
            colorScheme="green"
            _focus={{
              shadow: "",
            }}
            fontWeight="md"
            onClick={() => { RealizarSaque() }}
            isDisabled={ValorDigitado > parseFloat(usuarioInfo.valor) || ValidarChave || ValorDigitado === 0 || ValorDigitado < taxa}
          >
            <BiMoneyWithdraw />Realizar Saque
          </Button>
        )}







      </ButtonGroup >
    </>
  );


};

export default MenuSaque;
