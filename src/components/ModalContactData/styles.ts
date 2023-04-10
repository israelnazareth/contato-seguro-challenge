import styled from "styled-components";

export const modalStyle = {
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
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

export const ModalForm = styled.form`
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