import Modal from 'react-modal';
import data from '@/data/data.json';
import moment from "moment";
import { initialStateObj, useMyContext } from "@/contexts/context";
import { ModalConfirmButtons, ModalConfirmContainer, Table, modalStyle } from "./styles";
import { PencilSimpleLine, Trash } from "@phosphor-icons/react";

export function TableContactData() {
  const {
    inputValue, setModalContactIsOpen,
    modalConfirmIsOpen, setModalConfirmIsOpen,
    selectedOption, setContactObject,
    contactPosition, setContactPosition
  } = useMyContext()

  const filteredObj = inputValue.length > 0 ?
    data.filter(item => (
      item[selectedOption as keyof typeof initialStateObj].toLowerCase()
        .includes(inputValue.toLowerCase()))
    ) : data

  function handleEditButton(obj: typeof initialStateObj, index: number) {
    setModalContactIsOpen(true);
    setContactObject(obj);
    setContactPosition(index);
  }

  function handleRemoveContact(index: number) {
    setModalConfirmIsOpen(true)
    setContactPosition(index);
  }

  function handleConfirmDelete() {
    filteredObj.splice(contactPosition!, 1)
    setModalConfirmIsOpen(false)
    setContactPosition(null);
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>Nascimento</th>
          <th>Cidade</th>
          <th>Editar</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody>
        {filteredObj.map((obj, i) => (
          <tr key={i}>
            <td>{obj.name}</td>
            <td>{obj.email}</td>
            <td>{obj.phone}</td>
            <td>{moment(obj.birth_date).format('DD/MM/YYYY')}</td>
            <td>{obj.city}</td>
            <td>
              <button onClick={() => handleEditButton(obj, i)}>
                <PencilSimpleLine size={26} color="#FFF" />
              </button>
            </td>
            <td>
              <button onClick={() => handleRemoveContact(i)}>
                <Trash size={26} color="#FFF" />
              </button>
            </td>
          </tr>
        ))}
        <Modal
          isOpen={modalConfirmIsOpen}
          onRequestClose={() => setModalConfirmIsOpen(false)}
          style={modalStyle}
        >
          <ModalConfirmContainer>
            <h2>Você deseja mesmo excluir este contato?</h2>
            <ModalConfirmButtons>
              <button onClick={handleConfirmDelete}>Sim</button>
              <button onClick={() => setModalConfirmIsOpen(false)}>Não</button>
            </ModalConfirmButtons>
          </ModalConfirmContainer>
        </Modal>
      </tbody>
    </Table>
  )
}