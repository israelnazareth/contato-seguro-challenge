import Modal from 'react-modal';
import mockedCompanies from '@/data/companies.json';
import { useMyContext } from "@/contexts/context";
import { ContainerTable, ModalConfirmButtons, ModalConfirmContainer, Table, modalStyle } from "./styles";
import { PencilSimpleLine, SmileyXEyes, Trash } from "@phosphor-icons/react";
import { CompanyModel, CompanyRow } from '@/interfaces';
import { deleteCompany } from '@/services/companies';
import { NoData } from '../NoData';

export function TableCompaniesData() {
  const {
    inputValue, setModalIsOpen,
    modalConfirmIsOpen, setModalConfirmIsOpen,
    selectedOption, setCompanyObject,
    companyID, setCompanyID,
    companies, usersCompanies, users,
    fetchCompanies
  } = useMyContext()

  const filteredCompany = inputValue.length > 0 ?
    companies.filter(item => (
      item[selectedOption as keyof CompanyModel].toString().toLowerCase()
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
    deleteCompany(companyID)
    setModalConfirmIsOpen(false)
    setCompanyID(0);
    fetchCompanies()
  }

  function getUsernamesByCompanyID(companyID: number) {
    const company = usersCompanies.filter((obj) => obj.company_id === companyID)
    const userID = company.map((obj) => obj.user_id)
    const usersData = users.filter((obj) => userID.includes(obj.id))
    const names = usersData.map((obj) => obj.name).join(', ')
    return names
  }

  return (
    <>
      {filteredCompany.length === 0 ? <NoData /> :
        <ContainerTable>
          <Table>
            <caption>Empresas</caption>
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
                  <td data-label="Nome">{obj.name}</td>
                  <td data-label="CNPJ">{obj.cnpj}</td>
                  <td data-label="Endereço">{obj.address}</td>
                  <td data-label="Usuários">{getUsernamesByCompanyID(obj.id)}</td>
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