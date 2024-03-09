import styled from 'styled-components'

export const Container = styled.div`
  height: 150vh;
  min-width: 100vw;
  background-color: #383838
`
export const Botao4 = styled.button`
  border: 2px;
  padding: 15px 70px;
  background-color: #3498db; 
  color: #fff; 
  font-size: 15px; 
  cursor: pointer;
  margin-top: 40px;
  font-weight: bold;
  border-radius: 2px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: background-color 0.3s; /* Adiciona uma transição suave na mudança de cor de fundo */

  ${props => !props.disabled &&`
    &:hover {
      background-color: #1c689f;
    }
  `}

  ${props => props.disabled &&`
    opacity: 0.7;
    cursor: not-allowed; /* Adiciona cursor not-allowed quando o botão está desativado */
  `}
`;
export const Botao5 = styled.button`
  width: 40px;
  height: 25px;
  border: 2px;
  background-color: #3498db; 
  color: #fff; 
  font-size: 15px; 
  cursor: pointer;
  border-radius: 2px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`
export const Categorias = styled.div`
  display: flex;
  background-color: #383838;
  justify-content: center;
  gap: 20px;
  align-items: center;
  padding: 24px;
  

  p {
    color: white;
    font-size: 16px;
    font-weight: bold; 
  }

`;
export const Botaostyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  }

`;
export const ContainerPerfilgeral = styled.div`
  display: flex;
  justify-content: center;
  background-color: #383838;
`
export const ContainerInformações = styled.div`
  margin: 20px;
  display: block;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  min-height: 400px;
  min-width: 400px;
  display: flex;
  border-radius: 20px;
  background-color: #3498db;
  padding: 20px;
`
export const ContainerFoto = styled.div`
  margin: 20px;
  display: block;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  min-height: 400px;
  min-width: 250px;
  display: flex;
  border-radius: 20px;
  background-color: #fff;
  padding: 20px;
`
export const FormContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  margin-top: 20px;
  box-sizing: border-box;
`;
export const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
  h2 {
    color: #333;
  }
`;
export const ImagemCircular = styled.img`
  width: 100px; /* Defina a largura da imagem conforme necessário */
  height: 100px; /* Defina a altura da imagem conforme necessário */
  border-radius: 50%; /* Cria a borda circular */
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UploadContainer = styled.div`
  margin-bottom: 20px;

  label {
    font-weight: bold;
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

export const CategoryContainer = styled.div`
  margin-bottom: 20px;
  margin-top: 5px;
  label {
    font-weight: bold;
    margin-bottom: 8px;
  }

  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

export const ContainerImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
   a {
    font-weight: bold;
    margin-bottom: 8px;
  }
`;

export const ImageSpan = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  margin: 10px 0px;
  width: 300px;
  border-radious: 5px;
  background-color: #e9f0ff;
`;
export const TextEstoque = styled.div`
  margin-bottom: 20px;

  label {
    font-weight: bold;
    margin-bottom: 8px;
  }

  input,
  textarea {
    min-width: 150px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

`;

export const FormImage = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dashed #2e7d52;
  min-height: 120px;
  min-width: 300px;
  cursor: pointer;
  border-radius: 5px;
  
  a {
    color: #2e7d52;
    text-decoration: none; /* Remova a decoração padrão de link se desejar */
  }
`;

export const TextInputContainer = styled.div`
  margin-bottom: 20px;

  label {
    font-weight: bold;
    margin-bottom: 8px;
  }

  input,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  textarea {
    resize: vertical;
  }
`;

export const ButtonContainer = styled.div`
  text-align: center;
`;