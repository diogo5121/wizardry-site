import React from 'react';
import UserServices from '../Services/UserService';
import Home2 from '../pages/Home2';

const userService = new UserServices();

const ProtectedAdmin = ({children}) => {
  const usuarioAutenticado = userService.usuarioAdmin()
  return usuarioAutenticado ? children : <Home2/>
}
 
export default ProtectedAdmin;