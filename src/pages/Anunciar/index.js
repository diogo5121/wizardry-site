import { ImageSpan, FormImage, Botao4, TextInputContainer, ButtonContainer, ContainerPerfilgeral, ContainerImage, TextEstoque } from './style';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components'
import Footer from '../styles/footer';
import HeaderGlobal from '../styles/headerGlobal';
import axios from 'axios'
import headers from '../../Services/configapi'
import profileDefaut from '../../images/users/profile.png'
import { IoMdCloudUpload } from 'react-icons/io';
import { BiTrash } from 'react-icons/bi';
import { FaFileImage } from 'react-icons/fa';
import { validarDescricao, validarTitulo } from '../Utils/validadores';
import PuxarCategorias from './puxarCategorias';
import PuxarsubCategorias from './puxarSubcategorias';
import PuxarTipoProdutos from './puxarTiposProdutos';
import ipApi from '../../Services/ipApi';
import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Select, Spinner, Text, Textarea } from '@chakra-ui/react';


const Anunciar = (setCadastroNav) => {
  const [username, setusername] = useState([])
  const [rank, setrank] = useState([])
  const [FileName, setFileName] = useState("SEM ARQUIVO");
  const [imageSrc, setImageSrc] = useState(null);
  const [fileimage, setfileImage] = useState(null);
  const [categoria, setCategoria] = useState('semsem');
  const [subCategoria, setSubCategoria] = useState('semsem');
  const [TipoProduto, setTipoProduto] = useState('semsem');
  const [loading, setLoading] = useState(false);



  const [form, setForm] = useState([]);
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
            setusername(response.data.message[0].username)
            setrank(response.data.message[0].rank)
          } else {
            alert('Email ou senha icorretos')
          }
        })
        .catch(error => {
          alert('Email ou senha incorretos')
        });

    }
    getUsers()
  }, []);

  const handleCategoriaChange = (e) => {
    const novaCategoria = e.target.value;
    setCategoria(novaCategoria);
    setTipoProduto('semsem')
    setSubCategoria('semsem')

  };
  const handleSubCategoriaChange = (e) => {
    const novaCategoria = e.target.value;
    setSubCategoria(novaCategoria);
    setTipoProduto('semsem')
  };
  const handleTipoProdutoChange = (e) => {
    const novaCategoria = e.target.value;
    setTipoProduto(novaCategoria)

  };

  const sanitizeInput = (inputValue) => {
    return inputValue.replace(/['"{}()´]/g, ' ');
};


  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const sanitizedValue = sanitizeInput(inputValue);
    setForm({ ...form, [event.target.name]: sanitizedValue });

  };

  const TituloValor = () => {
    const titulo = 'a' + form.titulo
    if (validarTitulo(titulo) == false) {
      return <a style={{ color: 'red' }}>O título não deve passar de 60 caracters</a>
    } else {
      return
    }
  }
  const DescricaoValor = () => {
    const descricao = 'a' + form.descricao
    if (validarDescricao(descricao) == false) {
      return <a style={{ color: 'red' }}>Descrição é muito grande deve ter no maximo de 1500 caracters</a>
    } else {
      return
    }
  }
  const CadastrarProduto = async () => {
    setLoading(true)
    const header = {
      'Content-Type': 'multipart/form-data',
    };
    const formData = new FormData();
    formData.append('file', fileimage);

    const descricao = form.descricao
    const estoque = form.estoque
    const prazo = form.prazo
    const titulo = form.titulo
    const valor = form.valor
    const uid = localStorage.getItem('uid')



    axios.post(`${ipApi}/api/banco/uparimagem`, formData, { header })
      .then(response => {
        const valorFormatado = parseFloat(valor).toFixed(2);
        const NomeArquivo = response.data.caminho
        const data = {
          imagem: NomeArquivo,
          categoria: categoria,
          subcategoria: subCategoria,
          tipo_produto: TipoProduto,
          titulo: titulo,
          descricao: descricao,
          estoque: estoque,
          tempo_entrega: prazo,
          preco: valorFormatado,
          uid: uid,
        };
        
        axios.post(`${ipApi}/api/banco/createanuncio`, data, { headers })
          .then(response => {
            window.location.reload()
          })
          .catch(error => {
            setLoading(false)
          });


      })
      .catch(error => {
        setLoading(false)
      });

  };

  const validarInput = () => {
    const tituloValido = form.titulo && form.titulo.length > 1 && form.titulo.length <= 60;
    const descricaoValida = form.descricao && form.descricao.length >= 1 && form.descricao.length <= 1500;
    const estoqueValido = form.estoque >= 1 && form.estoque <= 999;
    const prazoValido = form.prazo >= 1 && form.prazo <= 14;
    const valorValido = form.valor >= 1 && form.valor <= 10000;
    const imagemDefinida = FileName !== "SEM ARQUIVO";
    const CategoriaValida = categoria !== "semsem";
    const SubCategoriaValida = subCategoria !== "semsem";
    const TipoProdutoValido = TipoProduto !== "semsem";

    return !(tituloValido && descricaoValida && estoqueValido && prazoValido && valorValido && imagemDefinida && CategoriaValida && SubCategoriaValida && TipoProdutoValido);
  };



  return (
    <Box
      bg="#edf3f8"
      _dark={{
        bg: "#111",
      }}
      p={{ base: 0, md: 10 }}
      minW={{ base: 0, md: 600 }}
      borderRadius={20}
      shadow='sm'
    >
      <Box alignItems='center' flexDirection='column' display='flex'>
        <h2>Cadastrar Anúncio</h2>
      </Box>
      <Box display='flex' alignItems='center' flexDirection='column'>
        <ContainerImage>
          <a>Carreque aqui a imagem do seu anuncio</a>
          <FormImage action="" onClick={() => document.querySelector(".input-field").click()}>
            <input type="file" accept="image/*" className='input-field' hidden
              onChange={({ target: { files } }) => {
                const SelectedFile = files[0];
                if (SelectedFile) {
                  if (SelectedFile.size <= 2 * 1024 * 1024) {
                    setFileName(SelectedFile.name);
                    setfileImage(SelectedFile);
                    setImageSrc(URL.createObjectURL(SelectedFile));
                  } else {
                    alert('A imagem deve ter menos de 2MB.');
                  }
                }
              }}
            />
            {imageSrc ?
              <img src={imageSrc} width={100} height={100} alt={FileName} />
              :
              <IoMdCloudUpload color='#2e7d52' size={100} />
            }
          </FormImage>
          <ImageSpan>
            <FaFileImage color='#2e7d52' />
            <span>
              {FileName}
            </span>
            <BiTrash
              color='#2e7d52'
              cursor={'pointer'}
              onClick={() => {
                setFileName('SEM ARQUIVO')
                setImageSrc(null)
              }}
            />
          </ImageSpan>
        </ContainerImage>
        <Box width='100%' mt={3} p={{ base: 5, md: 0 }}>
          <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="bold" color="black" mt={2} >Categoria do Produto:</Text>
          <Select value={categoria} onChange={handleCategoriaChange}>
            <option value="semsem">Selecione categoria principal</option>
            {PuxarCategorias()}
          </Select>
        </Box>
        <Box width='100%' mt={3} p={{ base: 5, md: 0 }}>
          <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="bold" color="black" mt={2}>SubCaregoria do produto:</Text>
          <Select value={subCategoria} disabled={categoria == "semsem"} onChange={handleSubCategoriaChange}>
            <option value="semsem">Selecione a subcategoria</option>
            {PuxarsubCategorias(categoria)}
          </Select>
        </Box>
        <Box width='100%' mt={3} p={{ base: 5, md: 0 }}>
          <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="bold" color="black" mt={2}>Tipo do produto:</Text>
          <Select value={TipoProduto} disabled={subCategoria == 'semsem'} onChange={handleTipoProdutoChange}>
            <option value="semsem">Selecione o tipo do produto</option>
            {PuxarTipoProdutos(subCategoria)}
          </Select>
        </Box >
        <Box width='100%' mt={3} p={{ base: 5, md: 0 }}>
          <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="bold" color="black" mt={2}>Escolha um título para o seu anúncio</Text>
          <Input
            type="text"
            name='titulo'
            placeholder="Digite aqui. No maximo 40 caracters"
            onChange={handleInputChange}
          />
          {TituloValor()}
        </Box>
        <Box width='100%' mt={3} p={{ base: 5, md: 0 }}>
          <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="bold" color="black" mt={2}>Descrição do Anúncio:</Text>
          <Textarea
            style={{ minHeight: '100px' }}
            placeholder="Digite a descrição"
            name='descricao'
            onChange={handleInputChange}
          />
          {DescricaoValor()}
        </Box>
        <Box width='100%' mt={3} p={{ base: 5, md: 0 }}>
        <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="bold" color="black" mt={2}>Estoque do produto:</Text>
          <Input
            type="number"
            name='estoque'
            onChange={handleInputChange}
            placeholder="(Unidades)"
            min={1}
            max={999}
          />
          {(form.estoque > 999 || form.estoque < 1) && (
            <a style={{ color: 'red' }}>O estoque tem que está entre 0 e 999 unidades</a>
          )}
        </Box>
        <Box width='100%' mt={3} p={{ base: 5, md: 0 }}>
        <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="bold" color="black" mt={2}>Prazo de Entrega do Produto:</Text>
          <Input
            type="number"
            name='prazo'
            onChange={handleInputChange}
            placeholder="(Dias)"
            min={1}
            max={30}
          />
          {(form.prazo > 14 || form.prazo < 1) && (
            <a style={{ color: 'red' }}>O prazo deve estar entre 1 e 14 dias</a>
          )}
        </Box>
        <Box width='100%' mt={3} p={{ base: 5, md: 0 }}>
          <FormControl colSpan={[6, 6, null, 2]} mt={3}>
          <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="bold" color="black" mt={2}>Preço:</Text>
              
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                color='green.300'
                fontSize='1.2em'
              >
                R$
              </InputLeftElement>
              <Input name='valor' type="number" placeholder='Coloque um preço' onChange={handleInputChange} min={1} max={30} />
            </InputGroup>
          </FormControl>
          {(form.valor > 10000 || form.valor < 1) && (
            <a style={{ color: 'red' }}>O valor do produto deve está entre R$1,00 até R$ 10.000,00</a>
          )}
        </Box>
        <ButtonContainer>
          <Button
            m={3}
            type="submit"
            colorScheme="green"
            _focus={{
              shadow: "",
            }}
            fontWeight="md"
            onClick={CadastrarProduto}
            isDisabled={validarInput() || loading}
          >{loading && (<Spinner/>)}
            Cadastrar
          </Button>
          <Button
            m={3}
            type="submit"
            colorScheme="red"
            _focus={{
              shadow: "",
            }}
            fontWeight="md"
            onClick={() => { setCadastroNav(false) }}
          >
            Cancelar
          </Button>
        </ButtonContainer>

      </Box>
    </Box>
  );
}

export default Anunciar;
