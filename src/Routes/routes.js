import React from 'react'
import ProtectedRoutes from './ProtectedRoutes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home2 from '../pages/Home2';
import ProtectedHome from './PrivateHome';
import MeuPerfil from '../pages/MeuPerfil';
import RecuperarSenha from '../pages/RecuperarSenha';
import MinhasVendas from '../pages/MinhasVendas';
import MeusAnuncios from '../pages/MeusAnuncios';
import DashBoard from '../pages/DashBoard';
import AnuncioPage from '../pages/AnuncioPage';
import Saldo from '../pages/Saldo';
import MinhasCompras2 from '../pages/MinhasCompras2';
import MeuSaldo from '../pages/MeuSaldo';
import Comprovante from '../pages/MeuSaldo/comprovante';
import Home from '../pages/Home';
import Categorias from '../pages/Categorias';
import SubCategorias from '../pages/SubCategorias';
import Suporte from '../pages/Suporte';
import Pesquisa from '../pages/Pesquisa';
import UparConta from '../pages/UparConta';
import Comofunciona from '../pages/comofunciona';
import TarifaPrazo from '../pages/tarifaprazo';
import FormasPag from '../pages/formaspag';
import Admin from '../pages/DashBoard';
import ProtectedRoutes2 from './ProtectedRoutes2';
import ProtectedAdmin from './ProtectAdmin';
import Politicareembolso from '../pages/Politica';
import PoliticaPrivacidade from '../pages/Politicaprivacidade';
import TermoCondicoes from '../pages/Termoscondicoes';
import CadastroNovo from '../pages/CadastroNovo';
import LoginNovo from '../pages/LoginNovo';
import CadastroNovoId from '../pages/CadastroNovoId';
import PainelAfiliado from '../pages/PainelAfiliado';
import Prefil from '../pages/Perfil';
import { Helmet } from 'react-helmet';

const Routering = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={
                    <ProtectedRoutes2>
                        <LoginNovo />
                    </ProtectedRoutes2>
                } />
                <Route path="/suporte" element={<Suporte />} />
                <Route path="/como-funciona" element={<Comofunciona />} />
                <Route path="/tarifa-prazos" element={<TarifaPrazo />} />
                <Route path="/formas-pagamento" element={<FormasPag />} />
                <Route path="/politica-reembolso" element={<Politicareembolso />} />
                <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
                <Route path="/termos-condicoes" element={<TermoCondicoes />} />
                <Route path="/pesquisa/:id" element={<Pesquisa />} />
                <Route path="/perfil/:id" element={<Prefil />} />
                <Route path="/recuperar-senha" element={
                    <ProtectedRoutes2>
                        <RecuperarSenha />
                    </ProtectedRoutes2>
                } />
                <Route path="/minhas-vendas" element={
                    <ProtectedRoutes>
                        <MinhasVendas />
                    </ProtectedRoutes>
                } />
                <Route path="/perfil" element={
                    <ProtectedRoutes>
                        <MeuPerfil />
                    </ProtectedRoutes>
                } />
                <Route path="/meus-anuncios" element={
                    <ProtectedRoutes>
                        <MeusAnuncios />
                    </ProtectedRoutes>
                } />
                <Route path="/minhas-compras" element={
                    <ProtectedRoutes>
                        <MinhasCompras2 />
                    </ProtectedRoutes>
                } />
                <Route path="/saldo" element={
                    <ProtectedRoutes>
                        <MeuSaldo />
                    </ProtectedRoutes>
                } />
                <Route path="/upar-conta" element={
                    <ProtectedRoutes>
                        <UparConta />
                    </ProtectedRoutes>
                } />
                <Route path="/didiadmin" element={
                    <ProtectedAdmin>
                        <Admin />
                    </ProtectedAdmin>
                } />
                <Route path="/painelafiliado" element={
                    <ProtectedRoutes>
                        <PainelAfiliado />
                    </ProtectedRoutes>

                } />
                <Route path="/cadastro" element={
                    <ProtectedRoutes2>
                        <CadastroNovo />
                    </ProtectedRoutes2>
                } />
                <Route path="/cadastro/:id" element={
                    <ProtectedRoutes2>
                        <CadastroNovoId />
                    </ProtectedRoutes2>
                } />
                <Route path="/anuncio/:id" element={<AnuncioPage />} />
                <Route path="/categorias/:id" element={<Categorias />} />
                <Route path="/subcategorias/:id" element={<SubCategorias />} />

                <Route path="/comprovantes/:id" element={
                    <ProtectedRoutes>
                        <Comprovante />
                    </ProtectedRoutes>
                } />
                <Route path="*" element={
                    <Home2 />
                }
                />
                <Route path="/" element={
                    <Home />
                }
                />
            </Routes>
        </Router>
    );
}

export default Routering;