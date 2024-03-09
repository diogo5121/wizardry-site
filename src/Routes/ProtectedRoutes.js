import React from 'react';
import UserServices from '../Services/UserService';
import LoginNovo from '../pages/LoginNovo';

const userService = new UserServices();

const ProtectedRoutes = ({children}) => {
  const usuarioAutenticado = userService.usuarioAutenticado()
  return usuarioAutenticado ? children : <LoginNovo/>
}
 
export default ProtectedRoutes;