import styled from 'styled-components';

export const ContainerTable = styled.div`
  overflow: auto;
  margin-top: .5rem;
`;

export const Table = styled.table`
  border-collapse: collapse;
  margin-top: .5rem;
  table-layout: fixed;
  
  caption {
    font-size: 1.5em;
    margin: .5em 0 .75em;
  }

  tr {
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    padding: .35em;
  }
  
  th, td {
    padding: .625em;
    text-align: center;
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

  @media screen and (max-width: 800px) {
    width: 100%;

    thead {
      display: none;
    }

    tr {
      display: block;
      border-radius: 0.25rem;
      border-bottom: 3px solid #ddd;
      margin-bottom: .625em;
    }

    td {
      button {
        margin: 0;
      }
    }

    td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ddd;
      text-align: right;
    }

    td::before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
    }

    td:last-child {
      border-bottom: 0;
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