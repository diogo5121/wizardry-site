import styled from 'styled-components';
import InputMask from 'react-input-mask';

const StyledInputMask = styled(InputMask)`
  color: #1A202C;
  font-size: 17px;
  background-color: transparent;
  border: 2px solid #CBD5E0;
  border-radius: 8px;
  width: 100%;
  padding: 10px;

  &::placeholder {
    color: #718096;
    font-size: 17px;
    opacity: 0.7;
  }
`;

const sanitizeInput = (inputValue) => {
  return inputValue.replace(/[ ()-]/g, '');
};

const SeuComponente = ({handleChange}) => {

  return (
    <StyledInputMask
      mask="(99) 99999-9999"
      maskChar={null}
      name='telefone'
      placeholder='(99) 99999-9999'
      onChange={(e) => {handleChange(sanitizeInput(e.target.value))}}
      type='tel'
    />
  );
}

export default SeuComponente;
