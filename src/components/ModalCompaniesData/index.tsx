import Modal from 'react-modal';
import Input from '../Input';
import { X } from '@phosphor-icons/react';
import { useRef } from 'react';
import { CompanyModel } from '@/interfaces';
import { FormHandles } from '@unform/core';
import { SelectUsers } from '../Select';
import { createCompany, updateCompany } from '@/services/companies';
import { initialStateObjCompany, useMyContext } from '@/contexts/context';
import { ModalForm, ModalFormButtons, ModalHeader, modalStyle } from './styles';
import { companyFormValidation } from '@/validations/companyFormValidation';

export function ModalCompaniesData() {
  const formRef = useRef<FormHandles>(null);

  const {
    modalIsOpen, setModalIsOpen,
    companyObject, setCompanyObject,
    users, fetchCompanies, fetchUsersAndCompanies,
    companyID, usersCompanies, setCompanyID
  } = useMyContext()

  function handleClearFields() {
    setCompanyObject(initialStateObjCompany)
    formRef.current!.reset()
  }

  function handleSubmit(data: CompanyModel) {
    const { id } = companyObject
    const { users } = data;

    const usersIds = users.map((user: any) => user.value)

    const validation = companyFormValidation(data, formRef)
    if (validation !== null) return;

    if (id > 0) {
      updateCompany(id, { ...data, users: usersIds });
      setModalIsOpen(false);
    } else if (id === 0) {
      createCompany({ ...data, users: usersIds });
      setModalIsOpen(false);
    }

    fetchCompanies();
    fetchUsersAndCompanies();
  }

  function getUsers(companyID: number) {
    if (companyID > 0) {
      const company = usersCompanies.filter((obj) => obj.company_id === companyID)
      const userID = company.map((obj) => obj.user_id)
      const usersData = users.filter((obj) => userID.includes(obj.id))
      const usersOptions = usersData.map((obj) => ({ label: obj.name, value: obj.id }))
      return usersOptions
    }
  }

  function usersOptions() {
    return users.map(user => ({ label: user.name, value: user.id }))
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={modalStyle}
      ariaHideApp={false}
    >
      <ModalHeader>
        {companyObject.id > 0 ? <h2>Editar empresa</h2> : <h2>Inserir empresa</h2>}
        <button onClick={() => setModalIsOpen(false)}>
          <X color="#EEE" size={30} weight="bold" />
        </button>
      </ModalHeader>
      <ModalForm onSubmit={handleSubmit} ref={formRef}>
        <Input
          name="name"
          label='Nome:'
          placeholder='Nome completo'
          defaultValue={companyObject.name}
        />
        <Input
          name="cnpj"
          label='CNPJ:'
          mask="99.999.999/9999-99"
          placeholder='12.345.678/0001-34'
          defaultValue={companyObject.cnpj}
        />
        <Input
          name="address"
          label='Endereço:'
          placeholder='Rua do Exemplo, nº 123'
          defaultValue={companyObject.address}
        />
        <SelectUsers
          name='users'
          label='Usuários:'
          options={usersOptions()}
          menuPortalTarget={document.body}
          defaultValue={getUsers(companyID)}
          menuPosition='fixed'
          isMulti
        />
        <ModalFormButtons>
          <button type="submit">Confirmar</button>
          <button onClick={handleClearFields}>Limpar</button>
        </ModalFormButtons>
      </ModalForm>
    </Modal>
  )
}