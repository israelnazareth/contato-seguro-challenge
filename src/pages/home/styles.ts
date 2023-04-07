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
`;

export const Fields = styled.div`
  display: flex;
  justify-content: space-between;
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

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 1rem;

  th, td {
    border-top: 1px solid #DDD;
    text-align: left;
    padding: 0.5rem;
  }

  td {
    button {
      display: flex;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background-color: #000;
      padding: 2px;
    }
  }
`;

export const customModal = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '35rem'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  }
};

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  margin-bottom: 1rem;
  padding-bottom: 1rem;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000;
    border: none;
    border-radius: 4px;
    padding: 1px;
    cursor: pointer;
  }
`;

export const ModalForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #aaa;
  }
`;

export const PhoneAndBirthday = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  
  label {
    width: 100%;
  }
`;

export const ModalFormButtons = styled.div`
  display: flex;
  gap: 1rem;

  button {
    padding: 0.5rem 0.8rem;
    border: none;
    background-color: #000;
    color: #eee;
    border-radius: 4px;
    cursor: pointer;
  }
`;
