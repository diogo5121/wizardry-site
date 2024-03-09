import React from 'react';
import { InputCustomizado } from './style'

const Input = ({
  name,
  placeholder,
  onChange,
  type
}) => {
  return ( 
    <InputCustomizado
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      type={type}
    />
   );
}
 
export default Input;