import Modal from 'react-modal';
// import data from '@/data/data.json';
import moment from "moment";
import { useMyContext } from "@/contexts/context";
import { ContainerTable, ModalConfirmButtons, ModalConfirmContainer, Table, modalStyle } from "./styles";
import { PencilSimpleLine, Trash } from "@phosphor-icons/react";
import { deleteUser } from '@/services/users';
import { UserModel, UserRow } from '@/interfaces';
import { NoData } from '../NoData';

export function TableContactData() {
  const {
    inputValue, setModalIsOpen,
    modalConfirmIsOpen, setModalConfirmIsOpen,
    selectedOption, setContactObject,
    contactID, setContactID,
    users, fetchUsers
  } = useMyContext()

  const filteredContact = []
  // inputValue.length > 0 ?
  //   users.filter(item => (
  //     item[selectedOption as keyof UserModel].toLowerCase()
  //       .includes(inputValue.toLowerCase()))
  //   ) : users

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

  function formatedDate(date: string) {
    return moment(date).format('DD/MM/YYYY')
  }

  return (
    <>
      {filteredContact.length === 0 ? <NoData /> :
        <ContainerTable>
          <Table>
            <caption>Usuários</caption>
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
                  <td data-label="Nome">{obj.name}</td>
                  <td data-label="Email">{obj.email}</td>
                  <td data-label="Telefone">{obj.phone}</td>
                  <td data-label="Nascimento">{obj.birth_date ? formatedDate(obj.birth_date) : 'N/A'}</td>
                  <td data-label="Cidade">{obj.city}</td>
                  <td data-label="Editar">
                    <button onClick={() => handleEditButton(obj, obj.id)}>
                      <PencilSimpleLine size={26} color="#FFF" />
                    </button>
                  </td>
                  <td data-label="Excluir">
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
        </ContainerTable>
      }
    </>
  )
}