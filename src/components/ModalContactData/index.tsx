import { X } from '@phosphor-icons/react';
import Modal from 'react-modal';
import { initialStateObj, useMyContext } from '@/contexts/context';
import {
  ModalForm,
  ModalFormButtons,
  ModalHeader,
  PhoneAndBirthday,
  modalStyle
} from './styles';
import { createUser, updateUser } from '@/services/users';
import Input from '../Input';
import { useRef } from 'react';
import { UserModel } from '@/interfaces';
import { FormHandles } from '@unform/core';
import { userFormValidation } from '@/validations/userFormValidation';

export function ModalContactData() {
  const formRef = useRef<FormHandles>(null);

  const {
    modalIsOpen, setModalIsOpen,
    contactObject, setContactObject,
    fetchUsers
  } = useMyContext()

  function handleClearFields() {
    setContactObject(initialStateObj)
    formRef.current!.reset()
  }

  function handleSubmit(data: UserModel) {
    const { id } = contactObject

    const validation = userFormValidation(data, formRef)
    if (validation !== null) return;

    if (id > 0) {
      updateUser(id, data)
      setModalIsOpen(false);
    } else if (id === 0) {
      createUser(data)
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
        {contactObject.id > 0 ? <h2>Editar contato</h2> : <h2>Inserir usuário</h2>}
        <button onClick={() => setModalIsOpen(false)}>
          <X color="#EEE" size={30} weight="bold" />
        </button>
      </ModalHeader>
      <ModalForm onSubmit={handleSubmit} ref={formRef}>
        <Input
          name="name"
          label='Nome:'
          placeholder='Nome completo'
          defaultValue={contactObject.name}
        />
        <Input
          name="email"
          label='Email:'
          placeholder='email@email.com'
          defaultValue={contactObject.email}
        />
        <PhoneAndBirthday>
          <Input
            type='tel'
            mask="(99) 99999-9999"
            name="phone"
            label='Telefone:'
            placeholder='(12) 93456-7890'
            defaultValue={contactObject.phone}
          />
          <Input
            name="birth_date"
            type='date'
            label='Data de nascimento:'
            defaultValue={contactObject.birth_date}
          />
        </PhoneAndBirthday>
        <Input
          name="city"
          label='Cidade onde nasceu:'
          placeholder="Porto Alegre"
          defaultValue={contactObject.city}
        />
        <ModalFormButtons>
          <button type="submit">Confirmar</button>
          <button onClick={handleClearFields}>Limpar</button>
        </ModalFormButtons>
      </ModalForm>
    </Modal>
  )
}