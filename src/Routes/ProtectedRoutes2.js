import React from 'react';
import UserServices from '../Services/UserService';
import Home from '../pages/Home';

const userService = new UserServices();

const ProtectedRoutes2 = ({children}) => {
  const usuarioAutenticado = userService.usuarioNaoAutenticado()
  return usuarioAutenticado ? children : <Home/>
}
 
export default ProtectedRoutes2;