import Modal from 'react-modal';
import companies from '@/data/companies.json';
import { useMyContext } from "@/contexts/context";
import { ModalConfirmButtons, ModalConfirmContainer, Table, modalStyle } from "./styles";
import { PencilSimpleLine, Trash } from "@phosphor-icons/react";
import { CompanyModel, CompanyRow } from '@/interfaces';

export function TableCompaniesData() {
  const {
    inputValue, setModalIsOpen,
    modalConfirmIsOpen, setModalConfirmIsOpen,
    selectedOption, setCompanyObject,
    setCompanyID,
  } = useMyContext()

  const filteredCompany = inputValue.length > 0 ?
    companies.filter(item => (
      item[selectedOption as keyof CompanyModel].toLowerCase()
        .includes(inputValue.toLowerCase()))
    ) : companies

  function handleEditButton(obj: CompanyRow, id: number) {
    setModalIsOpen(true);
    setCompanyObject(obj);
    setCompanyID(id);
  }

  function handleRemoveContact(id: number) {
    setModalConfirmIsOpen(true)
    setCompanyID(id);
  }

  function handleConfirmDelete() {
    setModalConfirmIsOpen(false)
    setCompanyID(0);
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>CNPJ</th>
          <th>Endereço</th>
          <th>Usuários</th>
          <th>Editar</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody>
        {filteredCompany.map((obj, i) => (
          <tr key={i}>
            <td>{obj.name}</td>
            <td>{obj.cnpj}</td>
            <td>{obj.address}</td>
            <td>{obj.users}</td>
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