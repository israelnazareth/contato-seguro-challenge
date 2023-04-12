import { X } from '@phosphor-icons/react';
import Modal from 'react-modal';
import { initialStateObjCompany, useMyContext } from '@/contexts/context';
import {
  ModalForm,
  ModalFormButtons,
  ModalHeader,
  modalStyle
} from './styles';
import Input from '../Input';
import { useRef } from 'react';
import { CompanyModel } from '@/interfaces';
import { FormHandles } from '@unform/core';

export function ModalCompaniesData() {
  const formRef = useRef<FormHandles>(null);

  const {
    modalIsOpen, setModalIsOpen,
    companyObject, setCompanyObject,
    fetchUsers
  } = useMyContext()

  function handleClearFields() {
    setCompanyObject(initialStateObjCompany)
    formRef.current!.reset()
  }

  function handleSubmit(data: CompanyModel) {
    const { name, cnpj, address, users } = data;
    const { id } = companyObject

    if (!name || !name.trim()) {
      formRef.current?.setFieldError('name', 'Nome obrigatório.')
      return;
    }

    if (name.length < 3) {
      formRef.current?.setFieldError('name', 'Nome deve ter no mínimo 3 caracteres.')
      return;
    }

    if (!cnpj || !cnpj.trim()) {
      formRef.current?.setFieldError('cnpj', 'CNPJ obrigatório.')
      return;
    }

    if (!address || !address.trim()) {
      formRef.current?.setFieldError('address', 'Endereço obrigatório.');
      return;
    }

    if (!users) {
      formRef.current?.setFieldError('users', 'Usuário(s) obrigatório(s).');
      return;
    }

    if (id > 0) {
      // updateUser(id, data)
      setModalIsOpen(false);
    } else if (id === 0) {
      // createUser(data)
      setModalIsOpen(false);
    }

    fetchUsers()
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
        <Input
          name="users"
          label='Usuários:'
          placeholder="Fulano, Beltrano, Ciclano"
          defaultValue={companyObject.users[0]}
        />
        <ModalFormButtons>
          <button type="submit">Confirmar</button>
          <button onClick={handleClearFields}>Limpar</button>
        </ModalFormButtons>
      </ModalForm>
    </Modal>
  )
}