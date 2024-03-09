import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 100vw;
  padding: 0;
  margin:0;
  height: 100%
  background-color: #383838;
  box-sizing: border-box;
`

export const ImagemCircular = styled.img`
  width: 100px; /* Defina a largura da imagem conforme necessário */
  height: 100px; /* Defina a altura da imagem conforme necessário */
  border-radius: 50%; /* Cria a borda circular */
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
  align-items: center;
  margin-top: 20px;
  min-height: 400px;
  min-width: 400px;
  display: flex;
  border-radius: 20px;
  background-color: #3498db;
  padding: 20px;
`
export const ContainerVendas = styled.div`
  margin: 20px;
  display: block;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  min-width: 250px;
  display: flex;
  border-radius: 20px;
  background-color: #fff;
  padding: 20px;
`
export const Botao4 = styled.button`
  border: 2px;
  padding: 5px;
  margin: 5px;
  background-color: #3498db; 
  color: #fff; 
  font-size: 15px; 
  cursor: pointer;
  border-radius: 2px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: background-color 0.3s; /* Adiciona uma transição suave na mudança de cor de fundo */

  &:hover {
    background-color: #1c689f; /* Nova cor de fundo quando o mouse está sobre o botão */
  }
`
export const Botao5 = styled.button`
  border: 2px;
  padding: 5px;
  margin: 5px;
  background-color: #ff0000; 
  color: #fff; 
  font-size: 15px; 
  cursor: pointer;
  border-radius: 2px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: background-color 0.3s; /* Adiciona uma transição suave na mudança de cor de fundo */

  &:hover {
    background-color: #991818; /* Nova cor de fundo quando o mouse está sobre o botão */
  }
`
export const TabelaVendas = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const TabelaCabecalho = styled.thead`
  background-color: #3498db;
  color: #fff;
`;

export const CabecalhoCelula = styled.th`
  padding: 10px;
  text-align: left;
`;

export const TabelaCorpo = styled.tbody``;

export const CorpoLinha = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const CorpoCelula = styled.td`
  padding: 10px;
`;

