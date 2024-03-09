import React, { useState } from 'react';
import { Container, Form, SubContainerSign } from './style';
import Input from '../Components/input/index';
import Botao from '../Components/Botao/index';
import { validarEmail} from '../Utils/validadores';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'
import ipApi from '../../Services/ipApi';
import headers from '../../Services/configapi'




const RecuperarSenha = () => {
    const [loading, setLoading] = useState();
    const [form, setForm] = useState([]);
    const email = form.email
    const navigate = useNavigate()
    const [Error, setError] = useState(null);



    const singIn = (e) => {
        e.preventDefault();
        const data = {
            email: email,
        };
        
        axios.post(`${ipApi}/api/resetpassword`, data, {headers})
            .then(response => {
                console.log(response)
                if( response.sucess = true) {
                    alert('Foi enviado um link para formatar o seu email')
                    navigate('/login')
                }else{
                    setError('Email incorreto ou não cadastrado');
                }
            })
            .catch(error => {
                setError('Email incorreto ou não cadastrado');
            });
        
    }

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const testeste = () => {
        if(validarEmail(form.email) == false) {
            return <a style={{color: 'red'}}>Email não é valido</a>
        }else{
            return
        }
        // fazer o validador de tudo aqui
    }
    const validarInput = () => {
        return validarEmail(form.email)
    }

    return (
        <Container>
            <Form>
                <h1>Recuperar senha</h1>
                <Input
                    name='email'
                    placeholder='Digite seu e-mail'
                    onChange={handleChange}
                    type='email'
                />
                {testeste()}
                <Botao
                    type='submit'
                    text='Recuperar Senha'
                    onClick={singIn}
                    disabled={loading === true || !validarInput()}
                />
                {Error && <p style={{ color: 'red' }}>{Error}</p>}
                <div>
                    
                    <SubContainerSign>
                        <p>Lembrou da senha?</p>
                        <NavLink to='/Login'>Clique aqui</NavLink>
                    </SubContainerSign>
                </div>
            </Form>
        </Container>
    );
}

export default RecuperarSenha;
