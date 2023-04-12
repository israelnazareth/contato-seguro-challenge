import Modal from 'react-modal';
// import data from '@/data/data.json';
import moment from "moment";
import { useMyContext } from "@/contexts/context";
import { ModalConfirmButtons, ModalConfirmContainer, Table, modalStyle } from "./styles";
import { PencilSimpleLine, Trash } from "@phosphor-icons/react";
import { deleteUser } from '@/services';
import { UserModel, UserRow } from '@/interfaces';

export function TableContactData() {
  const {
    inputValue, setModalIsOpen,
    modalConfirmIsOpen, setModalConfirmIsOpen,
    selectedOption, setContactObject,
    contactID, setContactID,
    users, fetchUsers
  } = useMyContext()

  const filteredContact = inputValue.length > 0 ?
    users.filter(item => (
      item[selectedOption as keyof UserModel].toLowerCase()
        .includes(inputValue.toLowerCase()))
    ) : users

  function handleEditButton(obj: UserRow, id: number) {
    setModalIsOpen(true);
    setContactObject(obj);
    setContactID(id);
  }

  function handleRemoveContact(id: number) {
    setModalConfirmIsOpen(true)
    setContactID(id);
  }

  function handleConfirmDelete() {
    deleteUser(contactID)
    setModalConfirmIsOpen(false)
    setContactID(0);
    fetchUsers()
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
        {filteredContact.map((obj, i) => (
          <tr key={i}>
            <td>{obj.name}</td>
            <td>{obj.email}</td>
            <td>{obj.phone}</td>
            <td>{moment(obj.birth_date).format('DD/MM/YYYY')}</td>
            <td>{obj.city}</td>
            <td>
              <button onClick={() => handleEditButton(obj, obj.id)}>
                <PencilSimpleLine size={26} color="#FFF" />
              </button>
            </td>
            <td>
              <button onClick={() => handleRemoveContact(obj.id)}>
                <Trash size={26} color="#FFF" />
              </button>
            </td>
          </tr>
        ))}
        <Modal
          isOpen={modalConfirmIsOpen}
          onRequestClose={() => setModalConfirmIsOpen(false)}
          style={modalStyle}
          ariaHideApp={false}
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