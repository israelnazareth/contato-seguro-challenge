import styled from 'styled-components';

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 1rem;

  th, td {
    border-top: 1px solid #DDD;
    text-align: left;
    padding: 0.5rem;
  }

  th {
    &:nth-last-child(1),
    &:nth-last-child(2) {
      text-align: center;
    }
  }

  td {
    button {
      display: flex;
      justify-content: center;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background-color: #000;
      width: 32px;
      margin: auto;
      padding: 0.125rem;
    }
  }
`;

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

export const ModalConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const ModalConfirmButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  button {
    padding: 0.5rem 0.8rem;
    border: none;
    border-radius: 4px;
    background-color: #000;
    color: #FFF;
    cursor: pointer;
    font-weight: bold;
    width: 8rem;
    margin-top: 2rem;
  }

  button:first-child {
    background-color: #F00;
  }
`;