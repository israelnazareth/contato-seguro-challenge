import styled from "styled-components";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100vw;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-image: url(https://images.unsplash.com/photo-1582653547187-2bb73b2d7b67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80);
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #EEE;
  padding: 1rem;
  border-radius: 8px;
  min-width: 50rem;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;

  strong {
    margin-right: 10px;
  }

  button {
    border: none;
    background-color: #000;
    color: #FFF;
    padding: 0.5rem;
    border-radius: 4px;
    cursor: pointer;
  }
`;

export const Fields = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  gap: 1.5rem;
  margin-top: 1rem;

  > button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    height: 2.5rem;
    background-color: #000;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  > input {
    width: 25rem;
    padding: 0 0.5rem;
    border: 1px solid gray;
    border-radius: 4px;
  }
`

export const HeaderTable = styled.h2`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  color: #1E1E1E;
`;
