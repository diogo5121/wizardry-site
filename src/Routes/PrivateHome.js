import React from 'react';
import UserServices from '../Services/UserService';
import DashBoard from '../pages/DashBoard';

const userService = new UserServices();

const ProtectedHome = ({children}) => {
  const usuarioAutenticado = userService.adminautenticado()
  return usuarioAutenticado ? children : <DashBoard/>
}
 
export default ProtectedHome;