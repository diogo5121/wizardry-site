import styled from 'styled-components'
import jogosImage from '../../images/jogos.png'
import servicos from '../../images/servicos.png'
import redes from '../../images/redes.png'

export const Container = styled.div`
  background-color: #383838;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
  height: 100%;
`


export const SubContainerSign = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0px 20px;
  align-items: center;
`
export const Botao2 = styled.button`
  width: 225px;
  height: 300px;
  background: url('${redes}');
  background-size: cover;
  background-position: center;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  border: none;
  border-radius: 15px;
  transition: background-size 0.5s, transform 0.5s;

  &:hover {
    background-size: 110%; 
    transform: scale(1.1);
  }
`;

export const Botao3 = styled.button`
  width: 300px;
  height: 405px;
  background: url('${jogosImage}');
  background-size: cover;
  background-position: center;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  border: none;
  border-radius: 15px;
  transition: background-size 0.5s, transform 0.5s;

  &:hover {
    transform: scale(1.1);
  }
`;
export const Categorias = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    color: white;
    font-size: 24px;
    font-weight: bold;
  }
`;

export const Botao6 = styled.button`
  width: 225px;
  height: 300px;
  background: url('${servicos}');
  background-size: cover;
  background-position: center;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  border: none;
  border-radius: 15px;
  margin-right: 10px;
  transition: background-size 0.5s, transform 0.5s;

  &:hover {
    background-size: 110%; /* Adjust the zoom level as needed */
    transform: scale(1.1);
  }
`;

export const CategoriasButtons = styled.div`
  display: flex;
  background-color: #383838;
  justify-content: center;
  gap: 20px;
  align-items: center;

`;

export const DestaquesSection = styled.div`
  display: flex;
  gap: 20px;
  background-color: #383838;
  padding: 10px;
`;

export const DestaqueItem = styled.div`
  background-color: #ffffff;
  width: 250px;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;
export const DestaquePreço = styled.div`
  background-color: #2e7d52;
  width: 170px;
  border-radius: 8px;
  padding: 16px;
  justify-content: center;
  margin-bottom: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  a {
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
  }
`;

export const DestaqueTitle = styled.h3`
  color: #333333;
  font-size: 20px;
  margin-bottom: 8px;
`;

export const DestaqueDescription = styled.p`
  color: #555555;
  font-size: 16px;
`;

export const DestaqueImage = styled.img`
  width: 220px;
  height: 220px;
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
  margin-right: 16px;
`;