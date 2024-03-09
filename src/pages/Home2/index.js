import { Container, Botao2, Categorias, Botao3, Botao4, Botao5, Botaostyle, Botao6, CategoriasButtons, DestaqueDescription, DestaqueItem, DestaqueTitle, DestaquesSection, Botao7, DestaquePreço, DestaqueImage } from './style';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import warframeProductImg from '../../images/warframeproduct.png'
import Footer from '../styles/footer';
import HeaderGlobal from '../styles/headerGlobal';
import PuxarAnunciosRecentes from './PuxarAnunciosRecentes';
import { Box, Text } from '@chakra-ui/react';


const Home2 = () => {
    const navigate = useNavigate()
    const goJogos = (e) => {
        e.preventDefault();
        navigate("/jogos")
    }
    const goRedes = (e) => {
        e.preventDefault();
        navigate("/redes")
    }
    const goServicos = (e) => {
        e.preventDefault();
        navigate("/servicos")
    }



    return (
        <>
            <HeaderGlobal />
            <Box height={100} display='flex' alignItems='center' justifyContent='center' flexDirection='column' mt={20}>
                <Text fontSize={30} fontWeight={700} color='blue'>Funsando o que não deve né ? Aqui tem nada pra você.</Text>
                <Text fontSize={30} fontWeight={700} color='blue'>ERROR 404 - Pagina não encontrada</Text>
            </Box>
            <Footer />
        </>
    );
}

export default Home2;
