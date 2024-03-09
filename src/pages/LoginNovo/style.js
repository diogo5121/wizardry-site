import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  min-width: 100vw;
  background-color: #383838

`

export const Form = styled.form`
  display: flex;
  padding: 3rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #201d1d;
  border-radius: 5px;
  width: 100%;
  max-width: 450px;
  gap: 30px 0px;

  h1 {
    color: white;
    font-size: 20px;
    font-weight: light;
  }

  p {
    color: white;
    font-size: 16px;
    font-weight: bold; 
  }

  a {
    color: white;
    font-size: 14px;
  }
`

export const SubContainerSign = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0px 20px;
  align-items: center;
`
export const HomeButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #2e7d52;
  color: #fff;
  padding: 10px 15px;
  border-radius: 50%;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1c5e40;
  }
`;